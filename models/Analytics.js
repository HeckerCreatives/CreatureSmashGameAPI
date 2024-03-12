const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        type: {
            type: String
        },
        description: {
            type: String
        },
        amount: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

const Analytics = mongoose.model("Analytics", AnalyticsSchema);
module.exports = Analytics