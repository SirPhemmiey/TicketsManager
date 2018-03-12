var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'}); //08074869045

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
  res.render('register', {
    errors: "Title"
  });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/dashboard', (req, res)=> {
  User.findOne({user: req.user.username }, (err, user)=> {
    res.render('dashboard', {user});
  });
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
 var name = req.body.name
 var email = req.body.email
 var username = req.body.username
 var password = req.body.password
 var password2 = req.body.password2
 if (req.file) {
   console.log("Uploading File...")
   var profileimage = req.file.filename;
 } else {
   console.log("No File Uploaded...")
   var profileimage = "noimage.jpg";
 }

 //Form Valdator
 req.checkBody('name', 'Name field is required').notEmpty();
 req.checkBody('email', 'Email field is required').isEmail();
 req.checkBody('username', 'Username field is required').notEmpty();
 req.checkBody('password', 'Password field is required').notEmpty();
 req.checkBody('password2', 'Passwords do not match').equals(password);
 //Check Errors
 var errors = req.validationErrors();
 if (errors) {
   res.render('register', {
     errors: errors
   });
   console.log(errors);
  }
 else {
   //console.log("No errors");
 }
});
module.exports = router;
  