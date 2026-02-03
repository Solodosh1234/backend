const NigeriaPhone = require('validate_nigerian_phone')
const menu = require('../../menu.js');
const userSession = require('../../../session_store.js')

const detectNetwork = (phoneNumber)=>{
  const mobile = new NigeriaPhone(phoneNumber)
  const network = mobile.getNetwork()
  return network
}

const airtimeOthersAmount = ()=>{
  menu.state('airtimeOthersAmount',{
    run:async ()=>{
      const {sessionId} = menu.args
      let network = await userSession.get(sessionId).network
      
      if (!network) {
          network = await detectNetwork(menu.val)
          if (!network) {
            return menu.con('Invalid network \n 0. Back')
          }
          await userSession.update(sessionId,'phone',menu.val)
          await userSession.update(sessionId,'network',network)
      }
    
      const message = await userSession.get(sessionId).message
      let response = 'Enter an amount'
      menu.con(message? message + response : response)
    },
    next:{
      '*[0-9]+':'airtimeOthersValidate',
      '0':'airtimeOthers'
    }
  });
};


module.exports = airtimeOthersAmount