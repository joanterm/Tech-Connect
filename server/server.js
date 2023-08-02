const express = require("express") //USE EXPRESS
const server = express()
server.use(express.json())
require('dotenv').config() // USE DOTENV
const usersRouter = require("./routes/users-router") //GET USERS ROUTER

//SERVER SET UP
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})

// ROUTER
server.use("/users", usersRouter)


//SANITY CHECK
server.get("/", (req, res) => {
    res.send("Express working!")
})