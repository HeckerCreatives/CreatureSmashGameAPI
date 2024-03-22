const mongoose = require("mongoose");

const PayoutSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        processby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staffusers"
        },
        status: {
            type: String
        },
        value: {
            type: Number
        },
        type: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Payout = mongoose.model("Payout", PayoutSchema);
module.exports = Payout