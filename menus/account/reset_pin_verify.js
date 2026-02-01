const menu  = require('../menu.js');
const userSession = require('../../session_store.js')

const resetPinVerify = ()=>{
  menu.state('resetPinVerify',{
    run:async ()=>{
      try {
        const invalidNinInput = await userSession.get(sessionId).invalidNinInput
        if (!invalidNinInput) {
         return menu.con('Enter your nin')
        }
        menu.con(invalidNinInput)
      } catch (err) {
        console.error('Error:', err);
        
      }
    },
    next:{
      '*^[0-9]{11}$':'resetPin'
    }
  });
};

module.exports = resetPinVerify