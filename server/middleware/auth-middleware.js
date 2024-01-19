const Auth = require("../models/auth-model")
const validator = require('validator')

//CHECKS IF EMAIL EXISTS
const isEmailTaken = (req, res, next) => {
    const {email} = req.body
    Auth.findOne({email})
    .then((result) => {
        if(result) {
            res.status(422).json({message: "User with this email already exists. Please choose a different email."})
        } 
    })
    next()
}

//CHECKS IS ENTERED EMAIL IS CORRECT
const isEmailCorrect = (req, res, next) => {
    const {email} = req.body
    Auth.findOne({email})
    .then((result) => {
        if (result == null) {
            res.status(401).json({message: "Incorrect email. Try again."})
            return
        }
    })
    next()
}


//CHECKS SIGNUP REQUIREMENTS
const checkRegistrationReqs = (req, res, next) => {
    const {email, password} = req.body
    if (!email.trim() || !password.trim()) {
        res.status(422).json({message: "Both email and password are required."})
        return
    }
    if (!validator.isEmail(email)) {
        res.status(422).json({message: "You must enter a valid email address."})
        return
    }
    if (password.trim().length < 4) {
        res.status(422).json({message: "Password must be at least 4 characters long"})
        return
    }
    next()
} 

module.exports = {
    isEmailTaken,
    checkRegistrationReqs,
    isEmailCorrect
}