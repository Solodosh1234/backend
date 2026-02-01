const menu = require('../../menu.js');
const bcrypt = require('bcryptjs')
const user = require('../../../models/user.js')
const userSession = require('../../../session_store.js')
const {buyAirtime,generateTransactionId} = require('../../utility.js')

const detectNetwork = (phoneNumber)=>{
  const mobile = new NigeriaPhone(phoneNumber)
  const network = mobile.getNetwork()
  return network
}

const airtimeSelfEnd = ()=>{
  menu.state('airtimeSelfEend',{
    '':async ()=>{
      try {
        const {sessionId,phoneNumber}= menu.args
        const validUser = await user.findOne({phoneNumber})
        const userPin = validUser.pin
        const pinMatch = await bcrypt.compare(menu.val,userPin)
        
        if (!pinMatch) {
        await userSession.update(sessionId,'invalidPinMessage','Wrong pin')
        return 'airtimeSelfPin'
        }
        
        const userId = validUser._id
        let request_id = await generateTransactionId()
        let service_id = await detectNetwork(menu.val)
        let amount = await userSession.get(sessionId).amount
        let phone = phoneNumber
        
        buyAirtime(userId,request_id,phone,service_id,variation_id).then(result=>{
        menu.end(`Transaction status:${result.data.status} \n ${result.data.message}`)
      })
      } catch (err) {
        console.error('Error:', err);
      }
    },
  });
};


module.exports = airtimeSelfEnd