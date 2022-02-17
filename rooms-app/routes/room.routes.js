const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const Room = require("../models/Room.model");
const eUsr = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


//************* CREATE ROOM *******************************/
router.route("/create-room", isLoggedIn)
.get((req, res) => {
    res.render("rooms/create-room");
  })

.post((req,res)=>{
    const name = req.body.name
    const description = req.body.description
    const imageUrl = req.body.imageUrl
    const owner = req.session.currentUserId
    const reviews = req.body.reviews

    Room.create({name, description, imageUrl, owner, reviews})
    .then((room)=>res.render("rooms/rooms-list", {room}))
    .catch(console.log)
})


//*************** ROOM LIST ******************************/
router.get("/room-list", (req, res)=>{
    Room.find()
    .then((room)=>res.render("rooms/rooms-list", {room}))
})





module.exports = router;