var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var FbPost = mongoose.model('FbPost');
var currentId = {'curId' : ''};
router.get('/users', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
});

router.post('/fbpost', function(req, res, next) {
  console.log("In fbpost");
  console.log(req.body);
  var poster = new FbPost(req.body);
  poster.save(function(err, user){
    if(err){
      console.log(err);
	   return next(err);
   }
    console.log(poster);
    res.json(poster);
  });
});

router.get('/fbpost', function(req, res, next) {
  console.log("In fbget");
  FbPost.find(function(err, fbpost){
    if(err){ 
      console.log(err);
      return next(err); }
    console.log(fbpost);
    res.json(fbpost);
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

router.post('/auth', function(req, res) {
  console.log('inside router');
  res.redirect('home.html');
});

router.post('/current', function(req, res) {
  console.log(req.body);
  currentId = req.body;
  console.log('post ' + currentId);
  res.json(currentId);
});

router.get('/current', function(req, res, next) {
  console.log('in get current ' + currentId.curId);
  //res.json(currentId);
  if(currentId.curId != '') {
  var query = User.find({'_id' : currentId.curId});
  query.exec(function (err, user){
    if (err) { console.log(err); return next(err); }
    if (!user) { return next(new Error("can't find user")); }
    res.json(user);
  });
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('whoops');
  res.render('index', { title: 'Express' });
});

module.exports = router;
