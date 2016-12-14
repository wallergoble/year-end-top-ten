var express = require('express');
var router = express.Router();
const passport = require('passport');

const List = require('../models/list')

// GET /lists
router.get('/', function(req, res, next){
  console.log('going to lists');
  List.find({ user: currentUser })
  .then( lists => {
    res.render('lists/index', { lists: lists, message:req.flash() });
  })
  .catch( err => {
    return next(err);
  });
});

// GET /lists/new
router.get('/new', function(req, res, next){
    res.render('lists/new', { message:req.flash() });
});

// POST /lists
router.post('/', function(req, res, next){
    console.log('currentUser:', currentUser);
    console.log('req.body:', req.body);

    var list = new List({
        user:        currentUser,
        title:       req.body.title,
        description: req.body.description
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


// SHOW /lists/new




module.exports = router;
