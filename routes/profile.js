var express = require('express');
const passport = require("passport")
const router = require("express").Router()
const db = require("../db")

/* GET profile info. */
// router.get('/profile', function(req, res, next) {
//   res.render('profile');
// });

// module.exports = router;


function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }
  next()
}

router
  .get("/profile", loginRequired, (req, res, next) => {
    db("users")
      .where("email", req.user.email)
      .then((users) => {
        res.render("profile", {
          users: users
        })
      })
  })
  // .get("/allPosts", loginRequired, adminRequired, (req, res, next) => {
  //   db("posts")
  //     .then((posts) => {
  //       res.render("posts", {
  //         title: "all user posts",
  //         posts: posts,
  //       })
  //     })
  // })
  // .get("/deletePost/:id", loginRequired, (req, res, next) => {
  //   const query = db("posts").where("id", req.params.id)

  //   if (!req.user.is_admin) {
  //     query.andWhere("user_id", req.user.id)
  //   }

  //   query
  //     .delete()
  //     .then((result) => {
  //       if (result === 0) {
  //         return res.send("Error, could not delete post")
  //       }
  //       res.redirect("/posts")
  //     })
  // })

module.exports = router