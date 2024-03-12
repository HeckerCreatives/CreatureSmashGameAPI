const { default: mongoose } = require("mongoose")
const Inventory = require("../models/Inventory")
const Maintenance = require("../models/Maintenance")
const { addwallethistory } = require("../utils/wallethistorytools")
const { addwallet } = require("../utils/walletstools")
const { creaturedata } = require("../utils/inventorytools")
const { addanalytics } = require("../utils/analyticstools")
const Decimal = require('decimal.js');

exports.playfightgame = async (req, res) => {
    const {id, username} = req.user
    const {creatureid} = req.query

    const maintenancedata = await Maintenance.findOne({type: "fightgame"})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting maintenance data ${err}`)
        return res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please contact customer support for more details." })
    })

    if (maintenancedata.value != "0"){
        return res.status(400).json({ message: "maintenance", data: "The fighting game is currently under maintenance! Please check our website for more details and try again later." })
    }

    const inventorydata = await Inventory.findOne({owner: new mongoose.Types.ObjectId(id), _id: new mongoose.Types.ObjectId(creatureid)})
    .catch(err => {

        console.log(`There's a problem getting inventory data for ${username} Error: ${err}`)

        return res.status(400).json({ message: "bad-request", data: "There's a problem getting your inventory data. Please contact customer support." })
    })

    if (!inventorydata){
        return res.status(400).json({ message: "notowned", data: "You don't owned this creature! Please buy first and try again" })
    }

    const creature = creaturedata(inventorydata.type)

    const creaturelimit = ((creature.amount * inventorydata.qty) * creature.percentage) + (creature.amount * inventorydata.qty)
    const limitperday = creaturelimit / creature.expiration

    if (inventorydata.dailyaccumulated >= limitperday){
        return res.status(400).json({ message: "dailylimit", data: "You already reached the limit per day! Please wait after 24 hours to play again." })
    }

    if (inventorydata.totalaccumulated >= creaturelimit){
        await Inventory.findOneAndDelete({owner: new mongoose.Types.ObjectId(id), _id: new mongoose.Types.ObjectId(creatureid)})
        .catch(err => {

            console.log(`There's a problem deleting inventory data for ${username} Error: ${err}`)
    
            return res.status(400).json({ message: "bad-request", data: "There's a problem getting your inventory data. Please contact customer support." })
        })

        return res.json({message: "creaturelimit"})
    }

    return res.json({message: "success"})
}

exports.donefightgame = async (req, res) => {
    const {id, username} = req.user
    const {creatureid, score} = req.body

    const inventorydata = await Inventory.findOne({owner: new mongoose.Types.ObjectId(id), _id: new mongoose.Types.ObjectId(creatureid)})
    .catch(err => {

        console.log(`There's a problem getting inventory data for ${username} Error: ${err}`)

        return res.status(400).json({ message: "bad-request", data: "There's a problem getting your inventory data. Please contact customer support." })
    })

    if (!inventorydata){
        return res.status(400).json({ message: "bad-request", data: "You don't owned this creature! Please buy first and try again" })
    }

    const creature = creaturedata(inventorydata.type)

    const tempScore = new Decimal(score)

    const creaturelimit = ((creature.amount * inventorydata.qty) * creature.percentage) + (creature.amount * inventorydata.qty)
    const limitperday = creaturelimit / creature.expiration
    const limitpersession = limitperday / 10
    const tempAccumulated = inventorydata.totalaccumulated + score

    const finalScore = Math.min(Math.max(tempScore, 0), limitpersession)

    if (finalScore > limitpersession){
        return res.status(400).json({ message: "cheater", data: "Your score is greater than session limit! Please don't use third party apps." })
    }

    if (inventorydata.dailyaccumulated >= limitperday){
        return res.status(400).json({ message: "dailylimit", data: "You already reached the limit per day! Please wait after 24 hours to play again." })
    }

    if (tempAccumulated >= creaturelimit){
        await Inventory.findOneAndDelete({owner: new mongoose.Types.ObjectId(id), _id: new mongoose.Types.ObjectId(creatureid)})
        .catch(err => {

            console.log(`There's a problem deleting inventory data for ${username} Error: ${err}`)
    
            return res.status(400).json({ message: "bad-request", data: "There's a problem getting your inventory data. Please contact customer support." })
        })
    }
    else{
        await Inventory.findOneAndUpdate({owner: new mongoose.Types.ObjectId(id), _id: new mongoose.Types.ObjectId(creatureid)}, {dailyaccumulated: new Decimal(inventorydata.dailyaccumulated).plus(finalScore), totalaccumulated: new Decimal(inventorydata.totalaccumulated).plus(finalScore)})
        .catch(err => {

            console.log(`There's a problem deleting inventory data for ${username} Error: ${err}`)
    
            return res.status(400).json({ message: "bad-request", data: "There's a problem getting your inventory data. Please contact customer support." })
        })
    }


    await addwallet("gamebalance", finalScore, id)
    await addwallethistory(id, "Creature Game", finalScore)
    await addanalytics(id, `Creature Game`, `Player ${username} win ${finalScore} in Creature Game`, score.toFixed(2))

    return res.json({message: "success"})
}

exports.playeventgame = async (req, res) => {
    const {id, username} = req.user

    const maintenancedata = await Maintenance.findOne({type: "eventgame"})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting maintenance data ${err}`)
        return res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please contact customer support for more details." })
    })

    if (maintenancedata.value != "0"){
        return res.status(400).json({ message: "bad-request", data: "The event game is not available! Please check our website for more details and try again later." })
    }

    return res.json({message: "success"})
}

exports.doneeventgame = async(req, res) => {

}