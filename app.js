var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var session = require("express-session")
var passport = require("passport")
var authRoutes = require("./routes/auth")
var db = require("./db")
require("./passport")

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var profile = require('./routes/profile');
var events = require('./routes/events');
var message = require('./routes/message');
var notifications = require('./routes/notifications');
var ratings = require('./routes/ratings');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "replace later", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(authRoutes)

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploadedimages");
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        callback(null, Date.now() + "_" + file.originalname);

        // callback(null, file.originalname);
    }
});
var upload = multer({ storage: Storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
   }).array("imgUploader", 1); //Field name and max count
app.post("/api/Upload", function (req, res) {
    // var fn = req.files.filename
    // var on = req.files.originalname
    // console.log(req.files)
    upload(req, res, function (err) {
        if (err) {
            return res.end("upload_error");
        }
        return res.send(req.files[0].filename);
    });
});

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/custom', express.static('public/stylesheets'));
app.use('/images', express.static('images'));
app.use('/uploadedimages', express.static('uploadedimages'));
app.use('/star', express.static('node_modules/kartik'));

app.use('/', index);
app.use('/', users);
app.use('/', auth);
app.use('/', profile);
app.use('/', events);
app.use('/', message);
app.use('/', notifications);
app.use('/', ratings);
app.get("/", (req, res, next) => {
    res.send({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated(),
    })
  })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
