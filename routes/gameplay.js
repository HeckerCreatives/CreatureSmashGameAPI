const router = require("express").Router()
const { playfightgame, donefightgame, doneeventgame } = require("../controllers/gameplay")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/playfightgame", protectplayer, playfightgame)
    .post("/donefightgame", protectplayer, donefightgame)
    .post("/doneeventgame", protectplayer, doneeventgame)

module.exports = router;
