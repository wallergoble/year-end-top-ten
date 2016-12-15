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
router.get('/', function(req, res, next){
  console.log('going to lists');
  List.find({ user: currentUser })
  .then( lists => {
    res.render('lists/index', { user: currentUser, lists: lists, message:req.flash() });
  })
  .catch( err => {
    return next(err);
  });
});

// GET /lists/new
router.get('/new', function(req, res, next){
    var list = new List({});

    res.render('lists/new', { message:req.flash(), list: list });
});

// CREATE
router.post('/', function(req, res, next){
    console.log('currentUser:', currentUser);
    console.log('req.body:', req.body);
    console.log('req.body.item:', req.body.item);
        var list = new List({
        user:        currentUser,
        title:       req.body.title,
        description: req.body.description,
        item:        req.body.item        
    });
    console.log('about to create list:', list);
    List.create(list)
    .then(function(saved){
        console.log('just saved list:', saved);
        res.redirect('/lists');
    })
    .catch(function(err) {
        return next(err);
    });
});

// SHOW /lists/:id
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
router.put('/:id', authenticate, function(req, res, next) {
  List.findById(req.params.id)
  .then(function(list) {
    if (!list) return next(makeError(res, 'Document not found', 404));
    if (!list.user.equals(currentUser.id)) return next(makeError(res, 'Get your own list, punk.', 401));
    console.log('list', list);
    list.title = req.body.title;
    list.description = req.body.description;
    console.log('look over here this is the requests 10th body item', req.body.item10);
    console.log('this should be list item[0], or the number 10 on the list', list.item[0]);
      // newItemArray = [];
      // for (let i = 10; i > list.item.length; i--) {
      //   newItemArray.push(req.body.item + i) // push(req.body.itemi)
      // }
      //   n = req.body.item
      // })
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
      list.markModified('item');
    console.log(list);
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
router.delete('/:id', authenticate, function(req, res, next) {
  List.findById(req.params.id)
  .then(function(list) {
    if (!list.user.equals(currentUser.id)) return next(makeError(res, 'Get your own list, punk.', 401));
    return list.remove();
  })
  .then(function() {
    console.log('deleted a list, going back to /lists')
    res.redirect('/lists');
  })
  .catch(function(err) {
    return next(err);
  });
});



module.exports = router;
