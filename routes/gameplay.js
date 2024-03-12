const router = require("express").Router()
const { playfightgame, donefightgame } = require("../controllers/gameplay")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/playfightgame", protectplayer, playfightgame)
    .post("/donefightgame", protectplayer, donefightgame)

module.exports = router;
