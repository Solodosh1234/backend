const menu = require('../../menu.js');
const messageSession = require('../../../message.js')

const airtimeSelf = ()=>{
  menu.state('airtimeSelf',{
    run:async ()=>{
      const {sessionId} = menu.args
      const message =await messageSession.get(sessionId).airtimeSelfMessage
      let response = 'Enter an amount'
      menu.con(message? message + response : response)
    },
    next:{
      '*[0-9]+': 'airtimeSelfValidate'
    }
  });
};


module.exports = airtimeSelf