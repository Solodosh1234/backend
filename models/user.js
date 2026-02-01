const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  phoneNumber:String,
  hasAnAccount:Boolean,
  accountReference:String,
  dateOfBirth:String,
  gender:String,
  balance:Number,
  verify:Boolean,
  nin:String,
  pin:String,
  date:Date
});


const user = mongoose.model('user',userSchema);
module.exports = user;