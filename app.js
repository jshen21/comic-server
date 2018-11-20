var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
// require('dotenv').config()

// var firebase = require('firebase');
// require('firebase/storage')
// // require('firebase/auth');
// // require('firebase/database');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require ('cors')

var app = express();

app.use(cors())
app.use(bodyParser.json({ limit: '100000mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100000mb', extended: true }));

// // Initialize Firebase
// // TODO: Replace with your project's customized code snippet
// var config = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: 'comic-server.firebaseapp.com',
//   databaseURL: 'https://comic-server.firebaseio.com',
//   storageBucket: 'comic-server.appspot.com',
// };
// firebase.initializeApp(config);

// // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();

// // Create a storage reference from our storage service
// var storageRef = storage.ref();

// // Create a child reference
// var imagesRef = storageRef.child('images'); // imagesRef now points to 'images'

// // Child references can also take paths delimited by '/'
// var spaceRef = storageRef.child('images/space.jpg');
// // spaceRef now points to "images/space.jpg"
// // imagesRef still points to "images"

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
