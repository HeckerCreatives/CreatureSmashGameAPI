const router = require("express").Router()
const { playfightgame, playeventgame, donefightgame, doneeventgame } = require("../controllers/gameplay")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/playfightgame", protectplayer, playfightgame)
    .get("/playeventgame", protectplayer, playeventgame)
    .post("/donefightgame", protectplayer, donefightgame)
    .post("/doneeventgame", protectplayer, doneeventgame)

module.exports = router;
