const router = require("express").Router()
const { leaderboard } = require("../controllers/score")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/leaderboard", protectplayer, leaderboard)

module.exports = router;
