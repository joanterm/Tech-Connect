const Auth = require("../models/auth-model")
const validator = require('validator')

const isEmailTaken = (req, res, next) => {
    const {email} = req.body
    Auth.findOne({email})
    .then((result) => {
        if(result) {
            res.status(422).json({message: "This email already exists. Please choose a different email."})
        } 
    })
    next()
}

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
    if (!validator.isStrongPassword(password)) {
        res.status(422).json({message: "Password must be 8 characters long, have 1 uppercase, 1 lowercase, 1 number, and 1 symbol."})
        return
    }
    next()
} 

module.exports = {
    isEmailTaken,
    checkRegistrationReqs
}