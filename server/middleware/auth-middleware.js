const Auth = require("../models/auth-model")

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

module.exports = {isEmailTaken}