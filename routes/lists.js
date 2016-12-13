var express = require('express');
var router = express.Router();
const passport = require('passport');


// GET /lists
router.get('/', function(req, res, next){
  console.log('going to lists');
  res.render('lists/index');
});

// GET /lists/new
router.get('/new', function(req, res, next){
    res.render('lists/new');
});

// SHOW /lists/new


// // POST /lists/new
// router.post('/new', function(req, res, next){
//     r
// })


module.exports = router;