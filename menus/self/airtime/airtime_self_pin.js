const menu = require('../../menu.js');
const messageSession = require('../../../message.js')


const airtimeSelfPin = ()=>{
  menu.state('airtimeSelfPin',{
    run:async ()=>{
      const {sessionId}= menu.args
      const invalidPinMessage = await messageSession.get(sessionId).airtimeSelfInvalidPinMessage
      if (invalidPinMessage) {
        menu.con(invalidPinMessage)
      }
      menu.con('Enter your pin')
    },
    next:{
      '*^[0-9]{4}$':'airtimeSelfEnd'
  }
  });
};


module.exports = airtimeSelfPin