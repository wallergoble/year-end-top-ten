var express = require('express');
var router = express.Router();
const passport = require('passport');


// GET /
router.get('/', function(req, res, next) {
  console.log('connecting to index');
  let loginMessage = null;
  if (currentUser) return res.render('index', { loginMessage: 'Hi ' + currentUser.local.email + '! Click on lists to view your lists!', user: currentUser, message:req.flash() });
  else return res.render('index', { loginMessage: 'Hello! Click sign up so you can start making lists!', message:req.flash() });
});

// GET /signup
router.get('/signup', function(req, res, next){
  console.log('going to signup');
  res.render('signup', { message: req.flash() });
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
  res.render('login', { message:req.flash() });
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
