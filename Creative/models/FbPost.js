var mongoose = require('mongoose');
var FbPostSchema = new mongoose.Schema({
  title : String,
  imageUrl : String,
  upvotes : Number,
  comments : String,
  user : String,
  avaterUrl: String,
});


mongoose.model('FbPost', FbPostSchema);
