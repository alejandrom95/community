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
  //get for message to display button/form
  .get("/create_event", loginRequired, (req, res, next) => {
    res.render("create_event")
  })
  //post for view
  .post("/create_event", loginRequired, (req, res, next) => {
    //creates the object
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
    //insert to db
    db("events")
      .insert(newEvent)
      .then((ids) => {
        // res.send(ids)
        res.redirect("/")
    }, next)
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

        db("events")
        .where("event_id", event_id)
        .where("owner_email", req.user.email)
        .then((event) => {

          db("volunteers")
          .where("event_id", event_id)
          .where("owner_email", req.user.email)
          .then((volunteers) => {
            var volunteersEmailList = [];
            for(var i = 0; i < volunteers.length; i++) {
              volunteersEmailList.push(volunteers[i].participant_email)
            }
            var eventName = event[0].event_name
            var newNotificationDetails = {
              description: "The event " + eventName+ " has been closed.",
              date_time: dateTime,
              type: 4
            };
            addNotificationsLoop(volunteersEmailList, 0, volunteersEmailList.length, newNotificationDetails)
            .then(function(result) {
              var retDir = "/o_event/" + event_id;
              res.redirect(retDir)
            })

          })
        }) 

        
    }, next)

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

        db("events")
        .where("event_id", event_id)
        .where("owner_email", req.user.email)
        .then((event) => {

          db("volunteers")
          .where("event_id", event_id)
          .where("owner_email", req.user.email)
          .then((volunteers) => {
            var volunteersEmailList = [];
            for(var i = 0; i < volunteers.length; i++) {
              volunteersEmailList.push(volunteers[i].participant_email)
            }
            var eventName = event[0].event_name
            var newNotificationDetails = {
              description: "The event " + eventName+ " has been cancelled.",
              date_time: dateTime,
              type: 5
            };
            addNotificationsLoop(volunteersEmailList, 0, volunteersEmailList.length, newNotificationDetails)
            .then(function(result) {
              var retDir = "/o_event/" + event_id;
              res.redirect(retDir)
            })

          })
        })
      }, next)

  })
  .post("/finish_event", loginRequired, (req, res, next) => {
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
        var retDir = "/rating/" + event_id;
        res.redirect(retDir)
        // var d = new Date();
        // var month = d.getMonth()
        // if(month < 10) month = "0" + month
        // var day = d.getDate()
        // if(day < 10) day = "0" + day
        // var hours = d.getHours()
        // if(hours < 10) hours = "0" + hours
        // var minutes = d.getMinutes()
        // if(minutes < 10) minutes = "0" + minutes
        // var seconds = d.getSeconds()
        // if(seconds < 10) seconds = "0" + seconds
        // var dateTime = d.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

        // db("events")
        // .where("event_id", event_id)
        // .where("owner_email", req.user.email)
        // .then((event) => {

        //   db("volunteers")
        //   .where("event_id", event_id)
        //   .where("owner_email", req.user.email)
        //   .then((volunteers) => {
        //     var volunteersEmailList = [];
        //     for(var i = 0; i < volunteers.length; i++) {
        //       volunteersEmailList.push(volunteers[i].participant_email)
        //     }
        //     var eventName = event[0].event_name
        //     var newNotificationDetails = {
        //       description: "The event " + eventName+ " has been cancelled.",
        //       date_time: dateTime,
        //       type: 5
        //     };
        //     addNotificationsLoop(volunteersEmailList, 0, volunteersEmailList.length, newNotificationDetails)
        //     .then(function(result) {
        //       var retDir = "/o_event/" + event_id;
        //       res.redirect(retDir)
        //     })

        //   })
        // })
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

        db("events")
        .where("event_id", event_id)
        .where("owner_email", req.user.email)
        .then((event) => {

          db("volunteers")
          .where("event_id", event_id)
          .where("owner_email", req.user.email)
          .then((volunteers) => {
            var volunteersEmailList = [];
            for(var i = 0; i < volunteers.length; i++) {
              volunteersEmailList.push(volunteers[i].participant_email)
            }
            var eventName = event[0].event_name
            var newNotificationDetails = {
              description: "The event " + eventName+ " has been reopened.",
              date_time: dateTime,
              type: 6
            };
            addNotificationsLoop(volunteersEmailList, 0, volunteersEmailList.length, newNotificationDetails)
            .then(function(result) {
              var retDir = "/o_event/" + event_id;
              res.redirect(retDir)
            })

          })
        })
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
                  db("events")
                    .where("event_id", event_id)
                    .then((event) => {
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

                      var eventName = event[0].event_name

                      var newNotification = {
                        email: req.user.email,
                        description: "The volunteer " + req.user.first_name + " " + req.user.last_name + " has cancelled their volunteer request to "+ eventName+ ".",
                        date_time: dateTime,
                        type: 3
                      };

                      db("notifications")
                      .insert(newNotification)
                      .then(function(ids) {
                        var retDir = "/event/" + event_id;
                        res.redirect(retDir)
                      }, next)
                    })




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

              var eventName = events[0].event_name

              var newNotification = {
                email: participant_email,
                description: "Volunteer request to " + eventName+ " has been accepted.",
                date_time: dateTime,
                type: 5
              };

              db("notifications")
              .insert(newNotification)
              .then(function(ids) {
                var retDir = "/o_event/" + event_id;
                res.redirect(retDir)
              }, next)

              
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

              var eventName = events[0].event_name

              var newNotification = {
                email: participant_email,
                description: "Volunteer request to " + eventName+ " has been denied.",
                date_time: dateTime,
                type: 2
              };

              db("notifications")
              .insert(newNotification)
              .then(function(ids) {
                var retDir = "/o_event/" + event_id;
                res.redirect(retDir)
              }, next)

              
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
    else if(search_zipcode !== '' && search_keyword === '') {
      searchEventsByZipcode(search_zipcode)
      .then(function(eByZipcode) {
        // res.send(eByZipcode)
        res.render("search_results", 
          {
            events: eByZipcode
          }
        )
      })
    }
    else if(search_zipcode === '' && search_keyword !== '') {
      search_keyword = search_keyword.trim();
      var keyWords = search_keyword.split(" ");

      searchEventsByKeywordLoop(keyWords, 0, keyWords.length)
      .then(function(eByKeyword) {
        var eventsByKeyword = []
        for(var i = 0; i < eByKeyword.length; i++) {
          if(eByKeyword[i].length > 0) {
            eventsByKeyword = filterSearchByKeyword(eByKeyword[i], eventsByKeyword)
          }
        }
        // res.send(eventsByKeyword)
        res.render("search_results", 
          {
            events: eByKeyword
          }
        )
      })
    }
    else if(search_zipcode !== '' && search_keyword !== '') {
      search_keyword = search_keyword.trim();
      var keyWords = search_keyword.split(" ");

      searchEventsByZipcode(search_zipcode)
      .then(function(eByZipcode) {
        var eventsByZipcodeAndKeyword = []
        for(var i = 0; i < eByZipcode.length; i++) {
          for(var j = 0; j < keyWords.length; j++) {
            if(eByZipcode[i].event_name.includes(keyWords[j])) {
              eventsByZipcodeAndKeyword.push(eByZipcode[i])
            }
          }
        }
        // res.send(eventsByZipcodeAndKeyword)
        res.render("search_results", 
          {
            events: eventsByZipcodeAndKeyword
          }
        )
      })
    }
  })
  // .get("/search_results", loginRequired, (req, res, next) => {
  //   res.render("search_results")
  // })

  function filterSearchByKeyword(events, eventsByKeyword) {
    var flagAddEvent = true
    for(var i = 0; i < events.length; i++) {
      var flagAddEvent = true

      if(eventsByKeyword.length > 0) {
        for(var j = 0; j < eventsByKeyword.length; j++) {
          if(events[i].event_id === eventsByKeyword[j].event_id) {
            flagAddEvent = false
            break;
          }
        }
      }
      if(flagAddEvent) {
        eventsByKeyword.push(events[i])
      }
    }
    return eventsByKeyword
  }
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
    .where("status", 1)
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
    .where("status", 1)
    .then((events_by_zipcode) => {
      return events_by_zipcode;
    });
  }

  function addNotificationsLoop(emails, currentValue, length, newNotificationDetails) {
    return addNotification(currentValue, emails[0], newNotificationDetails).then(function(id){
          ++currentValue;
          emails.shift();
          return (currentValue < length) ? addNotificationsLoop(emails, currentValue, length, newNotificationDetails) : 0
        })
  }
  var addNotification = Promise.method(function(count, email, newNotificationDetails){

    var newNotification = {
      email: email,
      description: newNotificationDetails.description,
      date_time: newNotificationDetails.date_time,
      type: newNotificationDetails.type
    };

    return db("notifications")
      .insert(newNotification)

  })

module.exports = router