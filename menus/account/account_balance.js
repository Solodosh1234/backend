const menu  = require('../menu.js');
const user  = require('../../models/user.js');

const accountBalance = ()=>{
  menu.state('accountBalance',{
    run:async()=>{
      try {
        const {phoneNumber} = menu.args
      
        await user.findOne(phoneNumber) .then(result=>{
        menu.end(`Your balance is ₦ ${result.balance}`)
        })
        
      } catch (err) {
        console.error('Error:', err);
      }
    }
  });
};

module.exports = accountBalance