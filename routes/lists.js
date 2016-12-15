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

// // SHOW /lists/:id
// router.get('/:id', authenticate, function(req, res, next) {
//   List.findById(req.params.id)
//   .then(function(list) {
//     if (!list) return next(makeError(res, 'Document not found', 404));
//     if (!list.user.equals(currentUser.id)) return next(makeError(res, 'Get your own list, punk!', 401));
//     res.render('lists/show', { list: list });
//   })
//   .catch(function(err) {
//     return next(err);
//   });
// });





module.exports = router;
