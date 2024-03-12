const { default: mongoose } = require("mongoose");
const Wallethistory = require("../models/Wallethistory")

exports.addwallethistory = async (id, type, amount) => {
    await Wallethistory.create({owner: new mongoose.Types.ObjectId(id), type: type, amount: amount})
    .catch(err => {

        console.log(`Failed to create wallet history data for ${id} type: ${type} price: ${amount}, error: ${err}`)

        return "failed"
    })

    return "success"
}