const mongoose = require('mongoose');


const depositSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  transactionReference:String,
  amountPaid:String,
  settlementAmount: String,
  date:Date
});


const deposit = mongoose.model('deposit',depositSchema);

module.exports = deposit;