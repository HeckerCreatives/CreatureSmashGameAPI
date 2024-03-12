const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        amount: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Score = mongoose.model("Score", scoreSchema)
module.exports = Score