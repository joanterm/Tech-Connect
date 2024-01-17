const authRouter = require("express").Router()
const mongoose = require("mongoose")
const Auth = require("../models/auth-model")
const bcrypt = require("bcrypt")
const {isEmailTaken} = require("../middleware/auth-middleware")

authRouter.post("/login", (req, res) => {
    res.status(200).json({message: "logged in"})
})

authRouter.post("/signup", isEmailTaken, (req, res, next) => {
    const {email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    Auth.create({email, password: hashedPassword})
    .then((user) => {
        res.status(201).json({email, user})
    })
    .catch(next)
})

module.exports = authRouter

