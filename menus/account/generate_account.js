const menu  = require('../menu.js');
const userSession  = require('../../session_store.js');

const generateAccount = ()=>{
  menu.state('generateAccount',{
    run:async ()=>{
      const {sessionId} = menu.args
      const verificationFailedMsg = await userSession.get(sessionId).verificationFailedMsg
      if (verificationFailedMsg) {
        return menu.con(verificationFailedMsg)
      }
      menu.con('Enter your nin \n To verify your account and create wallet');
    },
    next:{
      '*^[0-9]{11}$': 'createAccount'
    }
  });
};

module.exports = generateAccount