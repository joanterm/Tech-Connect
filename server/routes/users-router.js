const usersRouter = require("express").Router()

usersRouter.get("/", (req, res) => {
    res.status(200).json({message: "GET ALL USERS"})
})

usersRouter.get("/:id", (req, res) => {
    res.status(200).json({message: "GET USERS BY ID"})
})

usersRouter.post("/", (req, res) => {
    res.status(200).json({message: "POST USER"})
})

usersRouter.delete("/:id", (req, res) => {
    res.status(200).json({message: "DELETE USER"})
})

usersRouter.put("/:id", (req, res) => {
    res.status(200).json({message: "UPDATE USER"})
})

module.exports = usersRouter