const menu = require('../../menu.js');
const user = require('../../../models/user.js')
const userSession = require('../../../session_store.js')

const airtimeSelfValidate = ()=>{
  menu.state('airtimeSelfValidate',{
    run:async()=>{
        try {
          const {phoneNumber,sessionId} = menu.args
          const validUser = await user.findOne({phoneNumber})
          const userBalance = validUser.balance
          if (Number(menu.val) < 50) {
            await userSession.update(sessionId,'message','The minimum amount is 50 Naira')
            return 'airtimeSelf'
          }
          
          if (userBalance >= Number(menu.val)) {
          await userSession.update(sessionId,'amount',menu.val)
          return 'airtimeSelfPin'
          }
          
          await userSession.update(sessionId,'message','Insufficient funds. \n')
          return 'airtimeSelf'
        } catch (err) {
          console.error('Error:', err);
        }
      }
  });
};


module.exports = airtimeSelfValidate