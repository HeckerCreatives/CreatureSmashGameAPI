const Userdetails = require("../models/Userdetails")
const Inventory = require("../models/Inventory")
const { default: mongoose } = require("mongoose")

exports.dashboard = async (req, res) => {
    const {id, username} = req.user

    const data = {}

    data["username"] = username
    data["referralid"] = id
    data["inventory"] = {}
    data["creaturepicture"] = ""

    const details = await Userdetails.findOne({owner: new mongoose.Types.ObjectId(id)})
    .then(data => data)
    .catch(err => {

        console.log(`There's a problem getting inventory data for ${username} Error: ${err}`)

        return res.status(400).json({ message: "bad-request", data: "There's a problem getting your User data. Please contact customer support." })
    })

    data["creaturepicture"] = details.profilepicture

    const inventorylist = await Inventory.find({owner: new mongoose.Types.ObjectId(id)})
    .then(data => data)
    .catch(err => {

        console.log(`There's a problem getting inventory data for ${username} Error: ${err}`)

        return res.status(400).json({ message: "bad-request", data: "There's a problem getting your inventory data. Please contact customer support." })
    })

    inventorylist.forEach(creatures => {
        const {_id, type, rank, qty, totalaccumulated, dailyaccumulated} = creatures

        data["inventory"][type] = {
            id: _id,
            rank: rank,
            qty: qty,
            totalaccumulated: totalaccumulated,
            dailyaccumulated: dailyaccumulated,
            isowned: "Owned"
        }
    })

    const playerlb = await Score.findOne({owner: new mongoose.Types.ObjectId(id)})
    .then(data => data)
    .catch(err => {

        console.log(`Failed to get score data for ${id}, error: ${err}`)

        return res.status(401).json({ message: 'failed', data: `There's a problem with your account. Please contact customer support for more details` })
    })

    if (!playerlb){

        console.log(`No score data for ${playerlb.owner}`)

        return res.status(401).json({ message: 'failed', data: `There's a problem with your account. Please contact customer support for more details` })
    }

    const rank = await Score.countDocuments({amount: {$gte: playerlb.amount}})
    .then(data => data)
    .catch(err => {

        console.log(`Failed to count documents score data for ${id}, error: ${err}`)

        return res.status(401).json({ message: 'failed', data: `There's a problem with your account. Please contact customer support for more details` })
    })

    data["rank"] = rank

    return res.json({message: "success", data: data})
}