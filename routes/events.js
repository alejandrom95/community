var express = require('express');
const passport = require("passport")
const router = require("express").Router()
const db = require("../db")
var Promise = require('bluebird');

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
        // res.send(200)
        var retDir = "/o_event/" + event_id;
        res.redirect(retDir)
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
        var retDir = "/o_event/" + event_id;
        res.redirect(retDir)
    }, next)

  })
  .post("/open_event", loginRequired, (req, res, next) => {
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
        var retDir = "/o_event/" + event_id;
        res.redirect(retDir)
    }, next)

  })
  .get("/event/:event_id", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.params.event_id);
    db("events")
      .where("event_id", event_id)
      .then((events) => {
        db("volunteers")
        .innerJoin('users', 'volunteers.participant_email', '=', 'users.email')
        .where("event_id", event_id)
        .where("volunteers.participant_email", req.user.email)
        .then((volunteers) => {
          var volunteerStatus = "";
          if(events.length > 0) {

            if(Object.keys(volunteers).length > 0) {
              if(volunteers[0].status === 0) {
                volunteerStatus = "Denied";
              }
              else if(volunteers[0].status === 1) {
                volunteerStatus = "Pending";
              }
              else if(volunteers[0].status === 2) {
                volunteerStatus = "Accepted";
              }
            }
            else {
              volunteerStatus = "Not Volunteered";
            }


            res.render("event", {
              event_id: events[0].event_id,
              event_name: events[0].event_name,
              owner_email: events[0].owner_email,
              description: events[0].description,
              status: events[0].status,
              location: events[0].location,
              zipcode: events[0].zipcode,
              date_time: events[0].date_time,
              volunteer_status: volunteerStatus
            })
          }
          else {
            res.redirect('/')
          }
        })


        
        
      })
    // res.render("event", {
    //   event_id: req.params.event_id
    // })
  })
  .get("/o_event/:event_id", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.params.event_id);
    db("events")
      .where("event_id", event_id)
      .where("owner_email", req.user.email)
      .then((events) => {
        db("volunteers")
        .innerJoin('users', 'volunteers.participant_email', '=', 'users.email')
        .where("event_id", event_id)
        .then((volunteers) => {
          for(var i = 0; i < Object.keys(volunteers).length; i++) {
            if(volunteers[i].status === 0) {
              volunteers[i].status = "Denied";
            }
            else if(volunteers[i].status === 1) {
              volunteers[i].status = "Pending";
            }
            else if(volunteers[i].status === 2) {
              volunteers[i].status = "Accepted";
            }
            
          }
          var event_status = "";
          if(events[0].status === 1) {
            events[0].status = "Open";
          }
          else if(events[0].status === 2) {
            events[0].status = "Closed";
          }
          else if(events[0].status === 3) {
            events[0].status = "Cancelled";
          }
          else if(events[0].status === 4) {
            events[0].status = "Finished";
          }
          res.render("o_event", {
            volunteers: volunteers,
            event_id: events[0].event_id,
            event_name: events[0].event_name,
            owner_email: events[0].owner_email,
            description: events[0].description,
            status: events[0].status,
            location: events[0].location,
            zipcode: events[0].zipcode,
            date_time: events[0].date_time
          })
        })
      })
    // res.render("event", {
    //   event_id: req.params.event_id
    // })
  })
  // const event_id = parseInt(req.params.event_id);
    // db("volunteers")
    //   .where("event_id", event_id)
    //   .then((volunteers) => {
    //     res.render("event", {
    //       volunteers: volunteers
    //     })
    //   })
  .post("/request_to_join_event", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);

    var owner_email = "";


    db("events")
      .select("owner_email")
      .where("event_id", event_id)
      .then((email) => {
        owner_email = email[0].owner_email

        db("volunteers")
          .where("event_id", event_id)
          .where("participant_email", req.user.email)
          .then((volunteer) => {
            //if volunteer doesn't exist
            if(Object.keys(volunteer).length === 0) {
              var newVolunteerRequest = {
                event_id: event_id,
                owner_email: owner_email,
                participant_email: req.user.email,
                status: 1
              };
              db("volunteers")
                .insert(newVolunteerRequest)
                .then((ids) => {
                  res.redirect("/")
                }, next)
            }
            //if volunteer exists
            else {
              //if volunteer has already been accepted or has already made request
              if(volunteer[0].status === 2 || volunteer[0].status === 1) {
                var retDir = "/event/" + event_id;
                res.redirect(retDir)
              }
              else {
                db("volunteers")
                  .where("event_id", event_id)
                  .where("participant_email", req.user.email)
                  .update(
                  {
                    status: 1
                  })
                  .then((result) => {
                    // if(result === 0) {
                    //   return res.send(400)
                    // }
                    var retDir = "/event/" + event_id;
                    res.redirect(retDir)
                }, next)
              }
            }
            
          })


      })
  })
  .post("/cancel_volunteer_request", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);

        db("volunteers")
          .where("event_id", event_id)
          .where("participant_email", req.user.email)
          .then((volunteer) => {
            //if volunteer doesn't exist
            if(Object.keys(volunteer).length === 0) {
              var retDir = "/event/" + event_id;
              res.redirect(retDir)
            }
            //if volunteer exists
            else {
              db("volunteers")
                .where("event_id", event_id)
                .where("participant_email", req.user.email)
                .del()
                .then((result) => {
                  if(result === 0) {
                    return res.send(400)
                  }
                  res.redirect("/")
                }, next)
              
            }
            
          })



  })
  .post("/accept_volunteer", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
    const participant_email = req.body.participant_email;

    db("events")
      .where("event_id", event_id)
      .then((events) => {
        if(req.user.email === events[0].owner_email) {
          db("volunteers")
            .where("event_id", event_id)
            .where("participant_email", participant_email)
            .update(
            {
              status: 2
            })
            .then((result) => {
              if(result === 0) {
                return res.send(400)
              }
              // res.send(200)
              var retDir = "/o_event/" + event_id;
              res.redirect(retDir)
          }, next)
        }
        else {
          res.redirect('/')
        }
        
      })

    
  })
  .post("/deny_volunteer", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
    const participant_email = req.body.participant_email;


    db("events")
      .where("event_id", event_id)
      .then((events) => {
        if(req.user.email === events[0].owner_email) {
          db("volunteers")
            .where("event_id", event_id)
            .where("participant_email", participant_email)
            .update(
            {
              status: 0
            })
            .then((result) => {
              if(result === 0) {
                return res.send(400)
              }
              // res.send(200)
              var retDir = "/o_event/" + event_id;
              res.redirect(retDir)
          }, next)
        }
        else {
          res.redirect('/')
        }
        
      })
  })
  .post("/modify_event", loginRequired, (req, res, next) => {
    const event_id = parseInt(req.body.event_id);
    db("events")
      .where("event_id", event_id)
      .where("owner_email", req.user.email)
      .then((event) => {
        var event_status = event[0].status;
        db("events")
          .where("event_id", event_id)
          .where("owner_email", req.user.email)
          .update(
          {
            event_name: req.body.event_name,
            owner_email: req.user.email,
            description: req.body.event_description,
            status: event_status,
            location: req.body.event_location,
            zipcode: req.body.event_zipcode,
            date_time: req.body.event_date_time
          })
          .then((result) => {
            if(result === 0) {
              return res.send(400)
            }
            // res.send(200)
            var retDir = "/o_event/" + event_id;
            res.redirect(retDir)
          }, next)
      })
    
  })
  .post("/search_event", loginRequired, (req, res, next) => {
    var search_zipcode = req.body.search_zipcode;
    var search_keyword = req.body.search_keyword;
    var flag = true;
    if(search_zipcode === '' && search_keyword === '') {
      res.redirect("/")
    }
    else if(search_zipcode === '' && search_keyword !== '') {
///////////////////////////////////////////////////////////////////////////
//       // var arr = [];
      search_keyword = search_keyword.trim();
      var keyWords = search_keyword.split(" ");
      

      searchEventsByKeywordLoop(keyWords, 0, keyWords.length)
      .then(function(result) {
        res.send(result)
      })
      
///////////////////////////////////////////////////////////////////////////

    }
    else if(search_zipcode !== '' && search_keyword === '') {
      searchEventsByZipcode(search_zipcode)
      .then(function(ret) {
        res.send(ret)
      })
    }
    else if(search_zipcode !== '' && search_keyword !== '') {
      
    }


  })

  .get("/search_results", loginRequired, (req, res, next) => {
      res.render("search_results")
    })

  function searchEventsByKeywordLoop(keyWords, currentValue, length, results) {
    var r = results || [];
    return searchEventsByKeyword(currentValue, keyWords[0]).then(function(count){
          r.push(count[1])
          currentValue = count[0];
          keyWords.shift();
          return (count[0] < length) ? searchEventsByKeywordLoop(keyWords, currentValue, length, r) : r
        })
  }
  var searchEventsByKeyword = Promise.method(function(count, keyword){
    return db("events")
    .where('event_name', 'like', '%'+keyword+'%')
    .then((result) => {
      var temp = []
      temp.push(++count)
      temp.push(result)
      return temp;
    })
})

  function searchEventsByZipcode(z) {
    return db("events")
    .where("zipcode", z)
    .then((events_by_zipcode) => {
      return events_by_zipcode;
    });
  }

module.exports = router