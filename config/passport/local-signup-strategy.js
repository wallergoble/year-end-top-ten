var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');
var isValidPassword = require('./password');

var strategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {

    console.log('we are in the signup strategy');

    // check password confirmation
    if (req.body.password !== req.body.confirmPassword) {
      return callback(null, false, req.flash('error', 'Password and Password Confirmation do not match.'));
    }

    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email })
    .then(function(user) {
      if (user) {
        // A user with this email already exists
        let message = 'This email is already taken';
        return callback(null, false, req.flash('error', message));
      }
      else if (isValidPassword(password)) {
        // Create a new user
        var newUser            = new User(req.body);
        newUser.local.email    = email;
        newUser.local.password = newUser.encrypt(password);
        return newUser.save()
        .then(function(saved) {
          return callback(null, saved);
        });
      }
      else {
        let message = 'Your password is lame! Passwords should be at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and 1 special character.';
        return callback(null, false, req.flash('error', message));
      }
    })
    .catch(function(err) {
      return callback(err);
    });
  });

module.exports = strategy;
