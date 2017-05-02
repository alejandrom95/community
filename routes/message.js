var express = require('express');
const passport = require("passport");
const router = require("express").Router();
const db = require("../db");

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }
  next()
}

router
	.post("/message", loginRequired, (req, res, next) => {
 // res.send('respond with a resource');
 		const event_id = parseInt(req.body.event_id);
    db("messages")
      .where("event_id", event_id)
      .where(function() {
        this.where('sender_email', req.user.email).orWhere('sendee_email', req.user.email)
      })
      .orderBy("date_sent", "asc")
      .then((messages) => {
        // res.send(results)
        res.render("message", 
          {
            sendee_email: req.body.sendee_email, 
            event_id: event_id,
            messages: messages
          });
      })
	  // res.render("message", {sendee_email: req.body.sendee_email, event_id: event_id});
	  //res.send(req.body.owner_email);
	})
	.post("/send_message", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
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
      read_status: 0,
      event_id: event_id 
     };
     //insert into db
     db("messages")
      .insert(newMessage)
      .then((ids) => {
		    db("events")
        .where("event_id", event_id)
        .then((event) => {
          var newNotification = {
            email: req.body.sendee_email,
            description: "Recieved message from " + req.user.first_name + " " + req.user.last_name + " for event " + event[0].event_name +".",
              // "<form action=\"/message\" method=\"post\"><input type=\"hidden\" name=\"sendee_email\" value=\"" + req.body.sendee_email + "\"/><input type=\"hidden\" name=\"event_id\" value=\"" + event_id + "\"/><button type=\"submit\" class=\"btn btn-join\">View Messages</button></form>",
            date_time: dateTime,
            type: 7
          };
          db("notifications")
          .insert(newNotification)
          .then(function(ids) {
            // var retDir = "/event/" + event_id;
            res.redirect("/")
          }, next)
        })
        
        



     }, next)
	})
	



module.exports = router
