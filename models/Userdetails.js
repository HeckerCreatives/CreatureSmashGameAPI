const mongoose = require("mongoose");

const UserdetailsSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        email:{
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        postalcode: {
            type: String
        },
        paymentmethod: {
            type: String,
            default: ""
        },
        accountnumber: {
            type: String,
            default: ""
        },
        profilepicture: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

const Userdetails = mongoose.model("Userdetails", UserdetailsSchema)
module.exports = Userdetails