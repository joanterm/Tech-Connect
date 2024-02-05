const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        console.log("token", token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (!err) {
                req.decodedToken = decodedToken
                req._id = decodedToken._id
            } else {
                res.status(401).json({message: "Authorization failed. Token doesn't match"})
            }
        })
    } else {
        res.status(401).json({message: "Protected route. Token is required"})
    }
    next()   
}

module.exports = {checkToken}