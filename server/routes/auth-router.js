const authRouter = require("express").Router()
const Auth = require("../models/auth-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {isEmailTaken, checkRegistrationReqs} = require("../middleware/auth-middleware")

//JSON TOKEN
const generateToken = (id) => {
    return jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: "5h"})
}

//LOGIN
authRouter.post("/login", (req, res) => {
    res.status(200).json({message: "logged in"})
})

//SIGNUP
authRouter.post("/signup", isEmailTaken, checkRegistrationReqs, (req, res, next) => {
    const {email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    Auth.create({email, password: hashedPassword})
    .then((result) => {
        const jwtToken = generateToken(result._id)
        res.status(201).json({email: result.email, jwtToken: jwtToken})
    })
    .catch(next)
})

module.exports = authRouter

