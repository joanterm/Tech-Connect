const usersRouter = require("express").Router()
const mongoose = require("mongoose")
const Users = require("../models/users-model")

usersRouter.get("/", (req, res) => {
    Users.find({}).sort({ createdAt: -1 })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(400).json({message: error.message})
        })
})

usersRouter.get("/:id", (req, res) => {
    const {id} = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        Users.findById(id)
            .then((result) => {
                if(result == null) {
                    res.status(404).json({message: "This ID doesn't exist"})
                } else {
                    res.status(200).json(result)
                }
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            })
    }
    else {
        res.status(404).json({message: "This ID is not in a valid form"})
    }
})

usersRouter.post("/", (req, res) => {
    const {name, about, social} = req.body
    Users.create({name, about, social})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(400).json({message: error.message});
        })
})

usersRouter.delete("/:id", (req, res) => {
    const {id} = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        Users.findOneAndDelete({_id: id})
            .then((result) => {
                if(result == null) {
                    res.status(404).json({message: "This ID doesn't exist"})
                } else {
                    res.status(200).json(result)
                }
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            })
    } else {
        res.status(404).json({message: "This ID is not in a valid form"})
    }
})

usersRouter.put("/:id", (req, res) => {
    console.log(req.params)
    const {id} = req.params
    const body = req.body
    if (mongoose.Types.ObjectId.isValid(id)) {
        Users.findOneAndUpdate({_id: id}, {...body})
            .then((result) => {
                if(result == null) {
                    res.status(404).json({message: "This ID doesn't exist"})
                } else {
                    res.status(200).json(result)
                }
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            })
    }
    else {
        res.status(404).json({message: "This ID is not in a valid form"})
    }
})

module.exports = usersRouter