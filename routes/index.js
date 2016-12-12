var express = require('express');
var router = express.Router();
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('connecting to index');
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next){
  console.log('going to signup');
  res.render('signup');
});

router.post('/signup', function(req, res, next){
  console.log('registering someone: ', req.body);
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signUpStrategy(req, res, next);
});

module.exports = router;

