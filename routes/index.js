const routers = app => {
    console.log("Routers are all available");

    app.use("/auth", require("./auth"))
    app.use("/user", require("./user"))
    app.use("/score", require("./score"))
    app.use("/picuploads", require('./picuploads'))
    app.use("/gameplay", require("./gameplay"))
}

module.exports = routers