var express = require('express');
var router = express.Router();
const passport = require('passport');


// GET /
// Initial landing page render
router.get('/', function(req, res, next) {
  let loginMessage = null;
  if (currentUser) return res.render('index', { loginMessage: 'Hi ' + currentUser.local.email + '! Click on lists to view your lists!', user: currentUser, message:req.flash() });
  else return res.render('index', { loginMessage: 'If you are a new user, press sign up and make an account! Otherwise, login!', message:req.flash() });
});

// GET /signup
router.get('/signup', function(req, res, next){
  res.render('signup', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next){
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/lists',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next){
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
