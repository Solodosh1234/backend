const menu = require('../../menu.js');
const userSession = require('../../../session_store.js')

const airtimeSelf = ()=>{
  menu.state('airtimeSelf',{
    run:async ()=>{
      const {sessionId} = menu.args
      const message =await userSession.get(sessionId).message
      let response = 'Enter an amount'
      menu.con(message? message + response : response)
    },
    next:{
      '*[0-9]+': 'airtimeSelfValidate'
    }
  });
};


module.exports = airtimeSelf