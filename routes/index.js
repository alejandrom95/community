var express = require('express');
const passport = require("passport")
const router = require("express").Router()
const db = require("../db")

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }
  next()
}
/* GET home page. */
router
	.get('/', loginRequired, (req, res, next) => {
	  db("users")
	 	// .select("zipcode")////////////////////////////////////////////////remove select and just get user[0].zipcode
	 	.where("email", req.user.email)
	   	.then((user) => {
	   		// res.render('index', { zipcode: zipcode[0].zipcode });
	   		db("events")
		      .where("zipcode", user[0].zipcode)
		      .where("status", 1)
		      .then((events) => {
		      	db("events")
			      .where("owner_email", req.user.email)
			      .where("status", 1)
			      .orWhere("status", 2)
			      .then((owner_events) => {
			        db("volunteers")
			          .innerJoin('events', 'volunteers.event_id', '=', 'events.event_id')
				      .where("participant_email", req.user.email)
				      .where("volunteers.status", ">", 0)
				      .where("events.status", ">", 0)
				      .where("events.status", "<", 3)
				      .then((volunteer_events) => {
				      	// res.send(volunteer_events)
				        res.render("index", {
				        	zipcode: user[0].zipcode,
				          events: events,
				          owner_events: owner_events,
				          volunteer_events: volunteer_events,
                  user: user
				        })
				      })
			        })
			      })
		      })

	});

module.exports = router;

/*
volunteer events sample json

[{"participant_email":"user1@gmail.com","event_id":1,"owner_email":"user1@gmail.com","status":1,
"event_name":"test event","description":"test description","location":"test location",
"zipcode":"12345","date_time":"0000-00-00 00:00:00"}]
*/
