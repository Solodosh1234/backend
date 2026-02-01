const menu = require('../../menu.js');
const user = require('../../../models/user.js')
const userSession = require('../../../session_store.js')

const airtimeOthersValidate = ()=>{
  menu.state('airtimeOthersValidate',{
    // validation logic
    next:{
      '':async()=>{
        
        try {
          const {phoneNumber} = menu.args
          const validUser = await user.findOne({phoneNumber})
          const userBalance = validUser.balance
          
          if (Number(menu.val) < 50) {
            await userSession.update(sessionId,'message','The minimum amount is 50 Naira')
            return 'airtimeOthersAmount'
          }
          
          if (userBalance >= Number(menu.val)) {
          await userSession.update(sessionId,'amount',menu.val)
          return 'airtimeOthersPin'
          }
          
          await userSession.update(sessionId,'message','Insufficient funds. \n')
          return 'airtimeOthersAmount'
        } catch (err) {
          console.error('Error:', err);
        }
      }
    }
  });
};


module.exports = airtimeOthersValidate