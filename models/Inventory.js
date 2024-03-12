const mongoose = require("mongoose");

const inventoryShema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        type: {
            type: String
        },
        rank: {
            type: String
        },
        qty: {
            type: Number
        },
        totalaccumulated: {
            type: Number
        },
        dailyaccumulated: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Inventory = mongoose.model("Inventory", inventoryShema)
module.exports = Inventory