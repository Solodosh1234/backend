const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  order_id:String,
  status:String,
  name:String,
  type:String,
  amount:String,
  date:String
});


const transaction = mongoose.model('transaction',transactionSchema);

module.exports = transaction;