const express = require("express") //USE EXPRESS
const server = express()
server.use(express.json())
require('dotenv').config() // USE DOTENV
const mongoose = require("mongoose") //GET MONGOOSE FOR SCHEMAS
const usersRouter = require("./routes/users-router") //GET USERS ROUTER
const authRouter = require("./routes/auth-router") //GET AUTH ROUTER
const cors = require('cors') //CONNECT FRONTED W/ MONGO SERVER

//CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT
        server.listen(PORT, () => {
            console.log(`Connected. Listening on port ${PORT}...`) 
        })
    })
    .catch((error) => {
        console.log(error)
    })

//SANITY CHECK
server.get("/", (req, res) => {
    res.send("Express working!")
})

// ROUTER
server.use(cors())
server.use("/users", usersRouter)
server.use("/auth", authRouter)