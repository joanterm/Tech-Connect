const authRouter = require("express").Router()
const mongoose = require("mongoose")
const Auth = require("../models/auth-model")
const bcrypt = require("bcrypt")

authRouter.post("/login", (req, res) => {
    res.status(200).json({message: "logged in"})
})

authRouter.post("/signup", (req, res) => {
    const {email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    Auth.create({email, password: hashedPassword})
    .then((user) => {
        res.status(200).json({email, user})
    })
    .catch((error) => {
        res.status(400).json({message: error.message})
    })
})

module.exports = authRouter

