import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import passport from 'passport';
//const passport = require('passport');
import expressValidator from 'express-validator';
import LocalStrategy from 'passport-local';
//const LocalStrategy = require('passport-local').Strategy;
import passportLocalMongoose from 'passport-local-mongoose';
import multer from 'multer';
import mongoose from 'mongoose';
import flash from 'connect-flash';
let upload = multer({dest: './uploads'})
let User = require('./models/user');
let Admin = require('./models/admin');
let appRouter = require('./routes/index');
import Test from './models/test';
let configDB = require('./config/database');
//import passportConfig from './config/passport';
//const configPassport = require('./config/passport');
//let passportConfig = require('./config/passport');

const app = express();

//use flash messages
app.use(flash());

//parse request body content
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//parse cookie parser //read every cookie (needed to auth)
app.use(cookieParser());

// set view engine to Handlebars
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: {
    math: function(lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
        "+" : lvalue + rvalue,
        "-": lvalue - rvalue,
        "*" : lvalue * rvalue,
        "/" : lvalue / rvalue,
        "%" : lvalue % rvalue
      }[operator]
    },
    if_equal: function(a, b, options) {
      if (a == b) {
        return options.fn(this)
      }
      else {
        return options.inverse(this);
      }
    }
  }
  }));
app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our hbs files
app.set('view engine', '.hbs');

//serves up the static files in the public folder. Basically where you put your assets (img, js, css)
app.use(express.static(path.join(__dirname, 'public')));

// parse req variable into hbs templates
// app.use((req, res, next) => {
//   res.locals.flashes = req.flash()
//   res.locals.user = req.user || null
//   next()
// });


//don't go to any page that does not exist
// app.get('*', function(req, res) {
//   res.status(404).render('404', {errorCode: 404, error: 'Oops! Sorry we don\'t have that page.'});
// });


//configure passport for handling session and authentication
app.use(session({
  secret: 'This is a secret',
}));
 app.use(passport.initialize());
 app.use(passport.session()); //persistent login sessions

// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

//passport configuration
passport.use('local', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use('admin-local', new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


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
