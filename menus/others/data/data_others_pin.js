const menu = require('../../menu.js');
const message = require('../../../message.js')

const dataOthersPin =()=>{
  menu.state('dataOthersPin',{
    run:async ()=>{
      const {sessionId}= menu.args
      const invalidPinMessage = await message.get(sessionId).dataOthersInvalidPinMessage
      if (invalidPinMessage) {
        menu.con(invalidPinMessage)
      }
      menu.con('Enter your pin')
    },
    next:{
      '*^[0-9]{4}$':'dataOthersEnd'
    }
  })
}

module.exports = dataOthersPin