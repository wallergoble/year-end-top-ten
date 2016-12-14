var express = require('express');
var router = express.Router();
const passport = require('passport');

const List = require('../models/list')

// GET /lists
router.get('/', function(req, res, next){
  console.log('going to lists');
  res.render('lists/index');
});

// GET /lists/new
router.get('/new', function(req, res, next){
    res.render('lists/new');
});

// POST /lists/new
router.post('/', function(req, res, next){
    )
    var list = new List({   
        user:        currentUser,
        title:       req.body.title,
        description: req.body.description
    });
    console.log('this is about to be saved');
    list.save()
    .then(function(saved){
        res.redirect('/lists');
    })
    .catch(function(err) {
        return next(err);
    });
});


// SHOW /lists/new




module.exports = router;