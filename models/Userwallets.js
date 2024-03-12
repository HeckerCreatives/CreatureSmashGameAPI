const mongoose = require("mongoose");

const UserwalletsSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
)

const Userwallets = mongoose.model("Userwallets", UserwalletsSchema)
module.exports = Userwallets