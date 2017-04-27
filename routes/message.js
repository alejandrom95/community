var express = require('express');
const passport = require("passport");
const router = require("express").Router();
const db = require("../db");


router
	.post("/message", (req, res, next) => {
 // res.send('respond with a resource');
 		//
	  res.render("message", {sendee_email: req.body.owner_email, owner_email:req.user.email});
	  //res.send(req.body.owner_email);
	})
	.post("/send_message", (req, res, next) => {
		var d = new Date();
        var month = d.getMonth()
        if(month < 10) month = "0" + month
        var day = d.getDate()
        if(day < 10) day = "0" + day
        var hours = d.getHours()
        if(hours < 10) hours = "0" + hours
        var minutes = d.getMinutes()
        if(minutes < 10) minutes = "0" + minutes
        var seconds = d.getSeconds()
        if(seconds < 10) seconds = "0" + seconds
        var dateTime = d.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
     //creates the object

     var newMessage = {
     	//user = loged in
      sender_email: req.user.email,
      //body = contents of what i sent over. form
      sendee_email: req.body.sendee_email,
      message: req.body.message,
      date_sent: dateTime,
      read_status: 0   
     };
     //insert into db
     db("messages")
      .insert(newMessage)
      .then((ids) => {
         res.send(ids)
        //res.redirect("/")
     }, next)
	})
	//.get("/owner_email", (req, res, next) => {

	//})
	//.get("/event_name"), (req, res, next) => {

  // })



module.exports = router
