var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/users', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
});

router.post('/users', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, user){
    if(err){
      console.log(err);
      return next(err); }
    res.json(user);
  });
});

router.param('user', function(req, res, next, id) {
  console.log('id: ' + id);
  var query = User.find({'UserName' : id});
  query.exec(function (err, user){
    if (err) { console.log(err); return next(err); }
    if (!user) { return next(new Error("can't find user")); }
    req.user = user;
    return next();
  });
});

router.get('/users/:user', function(req, res) {
  res.json(req.user);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
