const authRouter = require("express").Router()
const Auth = require("../models/auth-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {isEmailTaken, checkRegistrationReqs, isEmailCorrect} = require("../middleware/auth-middleware")

//JSON TOKEN
const generateToken = (id) => {
    return jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: "5h"})
}

//LOGIN
authRouter.post("/login", isEmailCorrect, (req, res, next) => {
    const {email, password} = req.body
    Auth.findOne({email})
    .then((result) => {
        if (bcrypt.compareSync(password, result.password)) {
            const jwtToken = generateToken(result._id)
            res.status(200).json({email: result.email, jwtToken: jwtToken})
        } else {
            res.status(401).json({message: "Incorrect password. Try again."})
        }
    })
    .catch(next)
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

