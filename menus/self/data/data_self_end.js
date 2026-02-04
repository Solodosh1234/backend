const menu = require('../../menu.js');
const bcrypt = require('bcryptjs')
const user = require('../../../models/user.js')
const userSession = require('../../../session_store.js')
const messageSession = require('../../../message.js')
const {buyData,generateTransactionId} = require('../../utility.js')

const dataSelfEnd = ()=>{
  menu.state('dataSelfEnd',{
    '':async ()=>{
      try {
        const {sessionId,phoneNumber}= menu.args
        const validUser = await user.findOne({phoneNumber})
        const userPin = validUser.pin
        const pinMatch = await bcrypt.compare(menu.val,userPin)
      
        if (!pinMatch) {
           await messageSession.update(sessionId,'invalidPinMessage','Wrong pin')
           return 'dataSelfPin'
           }
      //make purchase logic
      const userId = validUser._id
      const {dataSelfPhoneNumber,dataSelfNetwork}= await messageSession.get(sessionId)
      
      const phone = dataSelfPhoneNumber
      const {dataPlan}= await userSession.get(sessionId)
      const request_id = await generateTransactionId()
      const {variation_id,service_id,}  = dataPlan
      
      buyData(userId,request_id,phone,service_id,variation_id).then(result=>{
        menu.end(`Transaction status:${result.data.status} \n ${result.data.message}`)
      })
      
      } catch (err) {
        console.error('Error:', err);
      }
    }
  });
};


module.exports = dataSelfEnd