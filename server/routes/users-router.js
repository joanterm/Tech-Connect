const usersRouter = require("express").Router()
const Users = require("../models/users-model")

usersRouter.get("/", (req, res) => {
    res.status(200).json({message: "GET ALL USERS"})
})

usersRouter.get("/:id", (req, res) => {
    res.status(200).json({message: "GET USERS BY ID"})
})

usersRouter.post("/", (req, res) => {
    const { name, about, social } = req.body
    Users.create({ name, about, social })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({ message: error.message });
        })
})

usersRouter.delete("/:id", (req, res) => {
    res.status(200).json({message: "DELETE USER"})
})

usersRouter.put("/:id", (req, res) => {
    res.status(200).json({message: "UPDATE USER"})
})

module.exports = usersRouter