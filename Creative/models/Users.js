var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  UserName : String,
  Password : String,
  Url : String
});


mongoose.model('User', UserSchema);
