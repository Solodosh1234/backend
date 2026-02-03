const menu = require('./menu.js');
const userSession = require('../session_store.js');
const user = require('../models/user.js');


const startMenu = ()=>{
   menu.startState({
     next:{
       '': async ()=>{
        const {phoneNumber} = menu.args;
        
        
        try {
          
          const validUser = await user.findOne({phoneNumber})
          
          if (validUser) {
          return "mainMenu";
          }
          
          return "startOnboarding";
          
        } catch (err) {
          console.error('Error:', err);
        }
        
      }}
    });
};

module.exports = startMenu;