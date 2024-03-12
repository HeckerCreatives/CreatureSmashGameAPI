const { default: mongoose } = require("mongoose")
const Userwallets = require("../models/Userwallets")

exports.walletbalance = async (type, id) => {
    const balance = await Userwallets.findOne({owner: new mongoose.Types.ObjectId(id), type: type})
    .then(data => data)
    .catch(err => {

        console.log(`Failed to get wallet data for ${data.owner} type: ${type}, error: ${err}`)

        return "failed"
    })

    if (!balance){
        console.log(`No wallet data for ${data.owner} type: ${type}, error: ${err}`)
        return "nodata"
    }

    return balance.amount
}

exports.reducewallet = async (type, price, id) => {
    await Userwallets.findOneAndUpdate({owner: new mongoose.Types.ObjectId(id), type: type}, {$inc: { amount: -price}})
    .catch(err => {

        console.log(`Failed to reduce wallet data for ${data.owner} type: ${type} price: ${price}, error: ${err}`)

        return "failed"
    })

    return "success"
}

exports.addwallet = async (type, price, id) => {
    await Userwallets.findOneAndUpdate({owner: new mongoose.Types.ObjectId(id), type: type}, {$inc: { amount: price}})
    .catch(err => {

        console.log(`Failed to add wallet data for ${data.owner} type: ${type} price: ${price}, error: ${err}`)

        return "failed"
    })

    return "success"
}