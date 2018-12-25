var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/user");
var auth = require("../auth/auth");
var pic = require("../config/config").profilepic;

//post api for save....
router.post("/signup", (req, res) => {
  db.findOne({ username: req.body.username }, (err, existUser) => {
    if (existUser) {
      return res.send({
        success: false,
        message: "username already exists ..."
      }); 
    }
  });
});
