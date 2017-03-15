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
	 	.select("zipcode")
	 	.where("email", req.user.email)
	   	.then((zipcode) => {
	   		// res.render('index', { zipcode: zipcode[0].zipcode });
	   		db("events")
		      .where("zipcode", zipcode[0].zipcode)
		      .then((events) => {
		      	db("events")
			      .where("owner_email", req.user.email)
			      .then((owner_events) => {
			        db("volunteers")
				      .where("participant_email", req.user.email)
				      .then((volunteer_events) => {
				        res.render("index", {
				        	zipcode: zipcode[0].zipcode,
				          events: events,
				          owner_events: owner_events,
				          volunteer_events: volunteer_events
				        })
				      })
			        })
			      })
		      })
	  
	});

module.exports = router;
