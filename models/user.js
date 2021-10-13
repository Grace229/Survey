const mongoose = require('mongoose');
const {Schema} = mongoose; 

const UserSchema = new Schema({
  firstName: { type:String },
  lastName: { type:String },
  email: { type: String},
  phoneNo: { type: Number },
  userID: {type: String}
},{timestamps: true});

const User = mongoose.model('user', UserSchema);
module.exports = User;