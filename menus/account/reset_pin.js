const menu  = require('../menu.js');
const user = require('../../models/user.js')
const utilty = require('../utility.js')
const userSession = require('../../session_store.js')

const resetPin = ()=>{
  menu.state('resetPin',{
    run: async ()=>{
      try {
        
        const {phoneNumber,sessionId} = menu.args
        const validUser = await user.findOne({phoneNumber})
        
        const nin = menu.val
        const userNin = validUser.nin
        
        if (userNin === nin) {
          menu.con('Enter new 4 digits pin');
        }
         await userSession.update(sessionId,'invalidNinInput','NIN  mismatch')
         return 'resetPinVerify'
        
      } catch (err) {
        console.error('Error:', err);
      }
      
    },
    next:{
      '*^[0-9]{4}$':'setNewPin'
    }
  });
};

module.exports = resetPin