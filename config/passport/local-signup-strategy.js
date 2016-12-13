var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');
var isValidPassword = require('./password');
var flash = require('connect-flash');

var strategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {
    console.log('local-signup strategy:', email, password);
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      console.log('looking for a user with email:', email);
      if (err) return callback(err);
      if (user) {
        // A user with this email already exists
        return callback(null, false, req.flash('error', 'This email is already taken.'));
      }
      else if (isValidPassword(password)) {
        // Create a new user
        var newUser            = new User();
        newUser.local.email    = email;
        newUser.local.password = newUser.encrypt(password);

        User.create(newUser, function(err) {
          return callback(err, newUser);
        });
      }
      else {
        return callback(null, false, req.flash('error', 'Your password is lame!'));
      }
    });
  });

module.exports = strategy;
