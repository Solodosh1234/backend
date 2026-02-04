const menu = require('../../menu.js');
const messageSession = require('../../../message.js')


const dataSelfPin = ()=>{
  menu.state('dataSelfPin',{
    run:async()=>{
      const {sessionId}= menu.args
      const invalidPinMessage = await userSession.get(sessionId).invalidPinMessage
      if (invalidPinMessage) {
        menu.con(invalidPinMessage)
      }
      menu.con('Enter your pin')
    },
    next:{
      '*^[0-9]{4}$':'dataSelfEnd'
    }
  });
};


module.exports = dataSelfPin