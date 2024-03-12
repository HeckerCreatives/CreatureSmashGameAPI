const mongoose = require("mongoose");

const walletHistorySchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        type: {
            type: String
        },
        amount: {
            type: Number
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: true
    }
)

const Wallethistory = mongoose.model("Wallethistory", walletHistorySchema)
module.exports = Wallethistory