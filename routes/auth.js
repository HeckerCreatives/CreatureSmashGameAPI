const router = require("express").Router()
const { authlogin, getreferralusername } = require("../controllers/auth")

router
    .get("/login", authlogin)
    .get("/getreferralusername", getreferralusername)

module.exports = router;
