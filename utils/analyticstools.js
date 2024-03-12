const { default: mongoose } = require("mongoose")
const Analytics = require("../models/Analytics")

exports.addanalytics = async(id, type, description, amount) => {
    await Analytics.create({owner: new mongoose.Types.ObjectId(id), type: type, description: description, amount: amount})
    .catch(err => {

        console.log(`Failed to create analytics data for ${id} type: ${type} amount: ${amount}, error: ${err}`)

        return "failed"
    })

    return "success"
}