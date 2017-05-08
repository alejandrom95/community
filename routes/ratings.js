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
	.get("/ratings/:event_id", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.params.event_id);
    // res.send(notification_id)
    db("events")
    .where("events.event_id", event_id)
    .then((events_results) => {
      var event = events_results[0];
      if(event.status === 4 && event.owner_email === req.user.email) {
        //get volunteers that are part of event and who were accepted as volunteers
        db("volunteers")
        .innerJoin('users', 'volunteers.participant_email', '=', 'users.email')
        // .leftOuterJoin('rating', 'rating.ratee_email', '=', 'volunteers.participant_email')
        // .leftOuterJoin('rating', 'rating.event_id', '=', 'volunteers.event_id')
        .leftOuterJoin('rating', function() {
          this.on('rating.ratee_email', '=', 'volunteers.participant_email').andOn('rating.event_id', '=', 'volunteers.event_id')
        })
        .where("volunteers.event_id", event_id)
        // .where("rating.event_id", event_id)
        .where("volunteers.status", 2)
        .then((volunteers) => {
          var volunteersInfo = []
          var count = 0
          for(var i = 0; i <volunteers.length; i++) {
            if(volunteers[i].ratee_email === null) {
              var temp = {"participant_email": volunteers[i].participant_email, "first_name" : volunteers[i].first_name, "last_name" : volunteers[i].last_name, "rating" : volunteers[i].rating}
              volunteersInfo.push(temp)
              ++count;
            }

          }
          if(count > 0) {
            res.render("ratings", {
              event_id: event.event_id,
              event_name: event.event_name,
              owner_email: event.owner_email,
              volunteers: volunteersInfo
            })
          }
          else {
            res.redirect("/")
          }

          // res.send(volunteersInfo)
          // res.send(volunteers)
        })
      }
      //redirect to home page if user tries going to rating page but they
      //are not the owner of the event and/or the event isn't finished yet
      else {
        res.redirect("/")
      }
    }, next)
	})
  .post("/rate", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
    const owner_email = req.body.owner_email;
    const participant_email = req.body.participant_email;
    const rating = parseInt(req.body.rating);
    const comment = req.body.comment;


    var newRating = {
      rater_email: owner_email,
      ratee_email: participant_email,
      event_id: event_id,
      rating: rating,
      comment: comment
    };
    db("rating")
      .insert(newRating)
      .then((ids) => {
        db("rating")
        .where("ratee_email", participant_email)
        .then((ratings) => {
          var ratingsAvg = 0
          for(var i = 0; i < ratings.length; i++) {
            ratingsAvg += ratings[i].rating
          }
          ratingsAvg /= ratings.length
          ratingsAvg = ratingsAvg.toFixed(2)
          db("users")
          .where("email", participant_email)
          .update({rating: ratingsAvg})
          .then((result) => {
            if (result === 0) {
              return res.send(400);
            }
            var retDir = "/ratings/" + event_id
            res.redirect(retDir)
          })
          // res.send(ratingsAvg + "...")
        })

      }, next)
    // res.send(notification_id)
    // db("events")
    // .where("event_id", event_id)
    // .then((events_results) => {
    //   var event = events_results[0];
    //   if(event.status === 4 && event.owner_email === req.user.email) {
    //     //get volunteers that are part of event and who were accepted as volunteers

    //   }
    //   //redirect to home page if user tries going to rating page but they
    //   //are not the owner of the event and/or the event isn't finished yet
    //   else {
    //     res.redirect("/")
    //   }
    // }, next)
  })
  // .post("/rate", loginRequired, (req, res, next) => {
  //   const event_id = parseInt(req.params.event_id);
  //   // res.send(notification_id)
  //   db("events")
  //   .where("event_id", event_id)
  //   .then((events_results) => {
  //     var event = events_results[0];
  //     if(event.status === 4 && event.owner_email === req.user.email) {
  //       //get volunteers that are part of event and who were accepted as volunteers
  //       db("volunteers")
  //       .where("event_id", event_id)
  //       .where("status", 2)
  //       .then((volunteers) => {
  //         res.render("ratings", {
  //           event_id: event.event_id,
  //           event_name: event.event_name,
  //           owner_email: event.owner_email,
  //           volunteers: volunteers
  //         })
  //       })
  //     }
  //     //redirect to home page if user tries going to rating page but they
  //     //are not the owner of the event and/or the event isn't finished yet
  //     else {
  //       res.redirect("/")
  //     }
  //   }, next)
  // })




module.exports = router
