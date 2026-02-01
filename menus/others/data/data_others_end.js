const menu = require('../../menu.js') ;
const bcrypt = require('bcryptjs')
const user = require('../../../models/user.js')
const userSession = require('../../../session_store.js')
const {buyData,generateTransactionId} = require('../../utility.js')

const dataOthersEnd = ()=>{
  menu.state('dataOthersEnd',{
    '':async ()=>{
      try {
        const {sessionId,phoneNumber}= menu.args
        const validUser = await user.findOne({phoneNumber})
        const userPin = validUser.pin
        const pinMatch = await bcrypt.compare(menu.val,userPin)
      
        if (!pinMatch) {
        await userSession.update(sessionId,'invalidPinMessage','Wrong pin')
        return 'dataOthersPin'
        }
      //make purchase logic
      const userId = validUser._id
      const {phone,network,dataPlan}= await userSession.get(sessionId)
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
module.exports = dataOthersEnd