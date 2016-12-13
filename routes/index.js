var express = require('express');
var router = express.Router();
const passport = require('passport');


// GET / 
router.get('/', function(req, res, next) {
  console.log('connecting to index');
  res.render('index', { title: 'Express' });
});

// GET /signup
router.get('/signup', function(req, res, next){
  console.log('going to signup');
  res.render('signup');
});

// POST /signup
router.post('/signup', function(req, res, next){
  console.log('registering someone: ', req.body);
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/lists',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next){
  console.log('going to login');
  res.render('login');
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/lists',
    failureRedirect : '/login',
    failureFlash : true
  });
  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

