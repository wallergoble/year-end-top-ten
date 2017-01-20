var express = require('express');
var router = express.Router();
const passport = require('passport');

const List = require('../models/list')

// Helper function to display errors
function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Authentication middleware
function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// GET /lists
// Index route that returns all lists
router.get('/', function(req, res, next){
  List.find({ user: currentUser })
  .then( lists => {
    res.render('lists/index', { user: currentUser, lists: lists, message:req.flash() });
  })
  .catch( err => {
    return next(err);
  });
});

// GET /lists/new
// Retrieves new form
router.get('/new', function(req, res, next){
    var list = new List({});
    res.render('lists/new', { message:req.flash(), list: list });
});

// CREATE
// Post route that sends new list to the server
router.post('/', function(req, res, next){
        var list = new List({
        user:        currentUser,
        title:       req.body.title,
        description: req.body.description,
        item:        req.body.item        
    });
    List.create(list)
    .then(function(saved){
        res.redirect('/lists');
    })
    .catch(function(err) {
        return next(err);
    });
});

// SHOW /lists/:id
// Read individual list
router.get('/:id', authenticate, function(req, res, next) {
  List.findById(req.params.id)
  .then(function(list) {
    if (!list) return next(makeError(res, 'Document not found', 404));
    res.render('lists/show', { list: list });
  })
  .catch(function(err) {
    return next(err);
  });
});

// EDIT
// Gets edit form for an individual list
router.get('/:id/edit', authenticate, function(req, res, next) {
  List.findById(req.params.id)
  .then(function(list) {
    if (!list) return next(makeError(res, 'Document not found', 404));
    if (!list.user.equals(currentUser.id)) return next(makeError(res, 'Get your own list, punk.', 401));
    res.render('lists/edit', { list: list });
  })
  .catch(function(err) {
    return next(err);
  });
});

// UPDATE
// PUTs edited information to server
router.put('/:id', authenticate, function(req, res, next) {
  List.findById(req.params.id)
  .then(function(list) {
    if (!list) return next(makeError(res, 'Document not found', 404));
    if (!list.user.equals(currentUser.id)) return next(makeError(res, 'Get your own list, punk.', 401));
    list.title = req.body.title;
    list.description = req.body.description;
      list.item[0] = req.body.item10;
      list.item[1] = req.body.item9;
      list.item[2] = req.body.item8;
      list.item[3] = req.body.item7;
      list.item[4] = req.body.item6;
      list.item[5] = req.body.item5;
      list.item[6] = req.body.item4;
      list.item[7] = req.body.item3;
      list.item[8] = req.body.item2;
      list.item[9] = req.body.item1;
      // Need this line for mongoose to realize the array has been modified
      list.markModified('item');
    return list.save();
  })
  .then(function(saved) {
    res.redirect('/lists');
  })
  .catch(function(err) {
    return next(err);
  });
});

// DESTROY
// all humans
router.delete('/:id', authenticate, function(req, res, next) {
  List.findById(req.params.id)
  .then(function(list) {
    if (!list.user.equals(currentUser.id)) return next(makeError(res, 'Get your own list, punk.', 401));
    return list.remove();
  })
  .then(function() {
    res.redirect('/lists');
  })
  .catch(function(err) {
    return next(err);
  });
});

module.exports = router;
