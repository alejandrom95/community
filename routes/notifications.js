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
	.get("/remove_notification/:id", loginRequired, (req, res, next) => {
    const notification_id = parseInt(req.params.id);
    // res.send(notification_id)
    db("notifications")
    .where("id", notification_id)
    .del()
    .then((result) => {
      if(result === 0) {
        return res.send(400)
      }
      res.redirect("/")




    }, next)
	})




module.exports = router