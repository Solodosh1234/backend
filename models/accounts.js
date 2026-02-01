const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  accountReference:String,
  bank:String,
  accountName:String,
  accountNumber:String
});


const account = mongoose.model('account',accountSchema);
module.exports = account;