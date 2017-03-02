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

router
  .get("/create_event", loginRequired, (req, res, next) => {
    res.render("create_event")
  })
  .post("/create_event", loginRequired, (req, res, next) => {
    var newEvent = {
      event_name: req.body.event_name,
      owner_email: req.user.email,
      description: req.body.event_description,
      status: 1,
      location: req.body.event_location,
      zipcode: req.body.event_zipcode,
      date_time: req.body.event_date_time
    };
    // res.render(newEvent);
    db("events")
      .insert(newEvent)
      .then((ids) => {
        // res.send(ids)
        res.redirect("/")
    }, next)
  })
  .get("/close_event", loginRequired, (req, res, next) => {
    res.render("close_event")
  })
  .post("/close_event", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
    const new_status = parseInt(req.body.status);

    db("events")
      .where("event_id", event_id)
      .where("owner_email", req.user.email)
      .update(
      {
        status: new_status
      })
      .then((result) => {
        if(result === 0) {
          return res.send(400)
        }
        res.send(200)
        res.redirect("/")
    }, next)

  })
  .get("/cancel_event", loginRequired, (req, res, next) => {
    res.render("cancel_event")
  })
  .post("/cancel_event", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
    const new_status = parseInt(req.body.status);

    db("events")
      .where("event_id", event_id)
      .where("owner_email", req.user.email)
      .update(
      {
        status: new_status
      })
      .then((result) => {
        if(result === 0) {
          return res.send(400)
        }
        res.send(200)
        res.redirect("/")
    }, next)

  })

module.exports = router