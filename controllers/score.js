const Score = require("../models/Score")

exports.leaderboard = async (req, res) => {
    const leaderboardpipeline = [
        {
          $lookup: {
            from: "users",  // Assuming your collection name is "gameusers"
            localField: "owner",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $sort: {
            "amount": -1  // Sort in descending order based on the amount
          }
        },
        {
          $limit: 10  // Limit the result to the top 15 users
        },
        {
          $project: {
            _id: "$user._id",
            username: "$user.username",
            amount: 1  // Include other fields as needed
          }
        }
    ]

    const leaderboardagg = await Score.aggregate(leaderboardpipeline)
    .catch(err => {
        console.log(`There's a problem getting leaderboard data ${err}`)
        return res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please contact customer support for more details." })
    })

    const data = {
        leaderboard: {}
    }

    let index = 1;

    leaderboardagg.forEach(leaderboarddata => {
        const {username, amount} = leaderboarddata

        data.leaderboard[index] = {
            username: username,
            amount: amount
        }

        index++;
    })

    return res.json({message: "success", data: data})
}