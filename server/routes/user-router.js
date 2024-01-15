const userRouter = require("express").Router()

userRouter.post("/login", (req, res) => {
    res.status(200).json({message: "logged in"})
})

userRouter.post("/signup", (req, res) => {
    res.status(200).json({message: "signed up"})
})

module.exports = userRouter