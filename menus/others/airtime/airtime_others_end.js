const menu = require('../../menu.js');
const bcrypt = require('bcryptjs')
const user = require('../../../models/user.js')
const userSession = require('../../../session_store.js')
const messageSession = require('../../../message.js')
const {buyAirtime,generateTransactionId} = require('../../utility.js')

const airtimeOthersEnd = ()=>{
  menu.state('airtimeOthersEnd',{
    '':async ()=>{
      try {
        const {sessionId,phoneNumber}= menu.args
        const validUser = await user.findOne({phoneNumber})
        const userPin = validUser.pin
        const pinMatch = await bcrypt.compare(menu.val,userPin)
      
        if (!pinMatch) {
        await messageSession.update(sessionId,'airtimeOthersInvalidPinMessage','Wrong pin')
        return 'airtimeOthersPin'
        }
        const userId = validUser._id
      //make purchase logic
      let request_id = await generateTransactionId()
      const {amount} =  await userSession.get(sessionId)
      const {airtimeOthersNetwork,airtimeOthersPhoneNumber} =  await messageSession.get(sessionId)
      
      let service_id = airtimeOthersNetwork
      const phophone = airtimeOthersPhoneNumber
        
        buyAirtime(userId,request_id,phone,service_id,variation_id).then(result=>{
        menu.end(`Transaction status:${result.data.status} \n ${result.data.message}`)
      })
      } catch (err) {
        console.error('Error:', err);
      }
    }
  });
};


module.exports = airtimeOthersEnd