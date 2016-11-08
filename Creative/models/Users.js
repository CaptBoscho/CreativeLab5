var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  UserName : String,
  Password : String,
  imageUrl : String
});


mongoose.model('User', UserSchema);
