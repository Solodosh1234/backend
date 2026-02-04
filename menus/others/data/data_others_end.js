const menu = require('../../menu.js') ;
const bcrypt = require('bcryptjs')
const user = require('../../../models/user.js')
const {buyData,generateTransactionId} = require('../../utility.js')
const userSession = require('../../../session_store.js')
const message = require('../../../message.js')

const dataOthersEnd = ()=>{
  menu.state('dataOthersEnd',{
    '':async ()=>{
      try {
        const {sessionId,phoneNumber}= menu.args
        const validUser = await user.findOne({phoneNumber})
        const userPin = validUser.pin
        const pinMatch = await bcrypt.compare(menu.val,userPin)
      
        if (!pinMatch) {
        await message.update(sessionId,'dataOthersInvalidPinMessage','Wrong pin')
        return 'dataOthersPin'
        }
      //make purchase logic
      const userId = validUser._id
      const {dataPlan}= await userSession.get(sessionId)
      const {dataOthersPhoneNumber}= await message.get(sessionId)
      const request_id = await generateTransactionId()
      const {variation_id,service_id,}  = dataPlan
      
      const phone = dataOthersPhoneNumber
      
      
      buyData(userId,request_id,phone,service_id,variation_id).then(result=>{
        menu.end(`Transaction status:${result.data.status} \n ${result.data.message}`)
      })
      } catch (err) {
        console.error('Error:', err);
      }
    }
  });
};
module.exports = dataOthersEnd