const menu = require('../../menu.js');
const userSession = require('../../../session_store.js')

const airtimeOthersPin = ()=>{
  menu.state('airtimeOthersPin',{
    run:async ()=>{
      const {sessionId}= menu.args
      const invalidPinMessage = await userSession.get(sessionId).invalidPinMessage
      if (invalidPinMessage) {
        menu.con(invalidPinMessage)
      }
      menu.con('Enter your pin')
    },
    next:{
      '*^[0-9]{4}$':'airtimeOthersEnd'
    }
  });
};


module.exports = airtimeOthersPin