const menu  = require('../menu.js');  
const user = require('../../models/user.js');  
const userSession = require('../../session_store.js');  
const utility = require('../utility.js');  // fixed typo from utilty to utility

const createAccount = () => {  
  menu.state('createAccount', {  
    next: {  
      '': async () => {  
        try {  
          const { phoneNumber, sessionId } = menu.args;  
          const nin = menu.val;  
          
          // Wait for NIN verification result
          const verifyResult = await utility.verifyAccount({ nin });  
          
          if (verifyResult.data.status === 'verify') {  
            // Update user verified status and NIN
            await user.findOneAndUpdate({ phoneNumber }, { verify: true, nin });  
            
            // Create account and wait for the result
            const createResult = await utility.createAccount({ phoneNumber });  
            
            // End the menu with account creation status
            menu.end(`Account creation status: ${createResult.data.status} \n ${createResult.data.message}`);  
            return;  // stop further execution here
          } else {  
            // Verification failed, update user to not verified
            await user.findOneAndUpdate({ phoneNumber }, { verify: false });  
            
            // Update user session with failure message
            await userSession.update(sessionId, 'verificationFailedMsg', 'NIN verification failed, please try again');  
            
            // Return next state to go to after failure
            return 'generateAccount';  
          }  
        } catch (err) {  
          console.error('Error:', err);  
          // Optionally handle error, e.g., return some error state or message
          menu.end('An unexpected error occurred. Please try again later.');  
        }  
      }  
    }  
  });  
};  

module.exports = createAccount;