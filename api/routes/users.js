const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/signup',(req,res,nex)=> {
   const user = new User({
       _id : new mongoose.Types.ObjectId(),
       email : req.body.email,
       password : 
   })
})

module.exports = router