const menu  = require('../menu.js');
const user  = require('../../models/user.js');
const account  = require('../../models/accounts.js');

const accountInfo = ()=>{
  menu.state('accountInfo',{
    run: async ()=>{
      try {
          const {phoneNumber} = menu.args
      
          const validUser = await user.findOne({phoneNumber})
     
          const userId = validUser._id
          await account.findOne({userId}).then(result=>{
          menu.end(`Your wallet details are \n Bank: ${result.bank} \n Account Name: ${result.accountNumber} \n Account Number: ${result.accountNumber}`)
     })
      } catch (err) {
        console.error('Error:', err);
      }
    }
  });
};

module.exports = accountInfo