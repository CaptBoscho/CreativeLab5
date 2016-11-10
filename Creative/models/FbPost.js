var mongoose = require('mongoose');
var FbPostSchema = new mongoose.Schema({
  UserName : String,
  Comment : String,
  imageUrl : String
});


mongoose.model('FbPost', FbPostSchema);
