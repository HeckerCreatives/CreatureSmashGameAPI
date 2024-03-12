const Users = require("../models/Users")
const Maintenance = require("../models/Maintenance")
const fs = require('fs')

const bcrypt = require('bcrypt');
const jsonwebtokenPromisified = require('jsonwebtoken-promisified');
const path = require("path");

const { DateTimeServer } = require("../utils/datetimetools")
const privateKey = fs.readFileSync(path.resolve(__dirname, "../keys/private-key.pem"), 'utf-8');
const { default: mongoose } = require("mongoose");

const encrypt = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

exports.authlogin = async(req, res) => {
    const { username, password, version } = req.query;

    if (version != process.env.GAME_VERSION){
        return res.json({message: "invalidversion", data: "Please update to new game version!"})
    }

    const maintenancedata = await Maintenance.findOne({type: "fullgame"})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting maintenance data ${err}`)
        return res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please contact customer support for more details." })
    })

    if (maintenancedata.value != "0"){
        return res.status(400).json({ message: "bad-request", data: "The game is currently under maintenance! Please check our website for more details and try again later." })
    }

    await Users.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } })
    .then(async user => {
        if (user && (await user.matchPassword(password))){
            if (user.status != "active"){
                return res.status(401).json({ message: 'notactive', data: `Your account had been ${user.status}! Please contact support for more details.` });
            }

            const token = await encrypt(privateKey)

            await Users.findByIdAndUpdate({_id: user._id}, {$set: {webtoken: token}}, { new: true })
            .then(async () => {
                const payload = { id: user._id, username: user.username, status: user.status, token: token }

                let jwtoken = ""

                try {
                    jwtoken = await jsonwebtokenPromisified.sign(payload, privateKey, { algorithm: 'RS256' });
                } catch (error) {
                    console.error('Error signing token:', error.message);
                    return res.status(500).json({ error: 'Internal Server Error', data: "There's a problem signing in! Please contact customer support for more details! Error 004" });
                }

                const data = {
                    token: jwtoken,
                    datetime: DateTimeServer()
                }

                return res.json({message: "success", data: data})
            })
            .catch(err => res.status(400).json({ message: "bad-request", data: "There's a problem with your account! There's a problem with your account! Please contact customer support for more details."  + err }))
        }
        else{
            return res.json({message: "nouser", data: "Username/Password does not match! Please try again using the correct credentials!"})
        }
    })
    .catch(err => res.status(400).json({ message: "bad-request", data: "There's a problem with your account! Please contact customer support for more details." }))
}

exports.getreferralusername = async (req, res) => {
    const {id} = req.query

    const user = await Users.findOne({_id: new mongoose.Types.ObjectId(id)})
    .then(data => data)
    .catch(err => {

        console.log(`There's a problem searching user for ${id} Error: ${err}`)

        return res.status(400).json({ message: "bad-request", data: "There's a problem getting referral, please contact support for more details." })
    })

    if (!user){
        console.log(`Referral id does not exist for ${id}`)

        return res.status(400).json({ message: "bad-request", data: "Referral id does not exist, please contact support for more details." })
    }

    return res.json({message: "success", data: user.username})
}