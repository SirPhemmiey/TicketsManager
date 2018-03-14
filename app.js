import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressValidator from 'express-validator';
import localStrategy from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';
import multer from 'multer';
import mongoose from 'mongoose';
import flash from 'connect-flash';
const upload = multer({dest: './uploads'})
const User = require('./models/user')
const appRouter = require('./routes/index');
import Test from './models/test';
const configDB = require('./config/database');
const configPassport = require('./config/passport');

const app = express();

//use flash messages
app.use(flash());

//parse request body content
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//parse cookie parser //read every cookie (needed to auth)
app.use(cookieParser());

// set view engine to Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our ejs files
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// view engine setup
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('express-ejs-extend'));

//serves up the static files in the public folder. Basically where you put your assets (img, js, css)
app.use(express.static(path.join(__dirname, 'public')));


//don't go to any page that does not exist
// app.get('*', function(req, res) {
//   res.status(404).render('404', {errorCode: 404, error: 'Oops! Sorry we don\'t have that page.'});
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


//configure passport for handling session and authentication
app.use(session({
  secret: 'This is a secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
// app.use(passport.session());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.use(new localStrategy(User.authenticate()));

// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });


//routing with all callback functions
app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//server initialization with database connection
const port = process.env.PORT;
var dummyTest = {
  name: 'Akinde Oluwafemi',
  age: '90'
}
function saveData() {

  var test = new Test(dummyTest);

  test.save();

}
app.listen(port, () => {
  // mongoose.Promise = global.Promise;
  // //connect to mongoDB
  // mongoose.connect("mongodb://localhost:27017/tickets", () => {
  // console.log('Connected to the database');
  //saveData();
  mongoose.connect(configDB.url);
  mongoose.Promise = global.Promise; //Tell mongoose to use ES6 promises
  let db = mongoose.connection;
 
    db.on('error', function(err){
  console.log('connection error', err);
  });
 
  db.once('open', function(){
  console.log('Connection to DB successful');
});
})

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
