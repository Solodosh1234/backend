const menu  = require('../menu.js');
const user = require('../../models/user.js')
const userSession = require('../../session_store.js')
const utilty = require('../utility.js')

const createAccount = ()=>{
  menu.state('createAccount',{
    next:{
      '':async ()=>{
      try {
        
        const {phoneNumber,sessionId}= menu.args
        const nin = menu.val
        utility.verifyAccount({nin}).then(result=>{
          if (result.data.status === 'verify') {
            await user.findOneAndUpdate({phoneNumber},{
              verify:true,
              nin
            })
         
            utility.createAccount({phoneNumber}).then(result=>{
              menu.end(`Account creation status: ${result.data.status} \n ${result.data.message}`)
            })
          }
          
          await user.findOneAndUpdate({phoneNumber},{
            verify:false
          })
        })
         await userSession.update(sessionId,'verificationFailedMsg','NIN verification failed, please try again')
         return 'generateAccount'
      } catch (err) {
        console.error('Error:', err);
      }
    }
      
    }
  });
};

module.exports = createAccount