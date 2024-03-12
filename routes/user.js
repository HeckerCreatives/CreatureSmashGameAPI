const router = require("express").Router()
const { dashboard } = require("../controllers/user")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/dashboard", protectplayer, dashboard)

module.exports = router;
