const mongoose = require("mongoose");

const PayinSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
)

const Payin = mongoose.model("Payin", PayinSchema);
module.exports = Payin