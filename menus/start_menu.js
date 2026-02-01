const menu = require('./menu.js');
const userSession = require('../session_store.js');

const users =[{
  phoneNumber:"+2348160315241",
  firstname:"solomon",
  lastname: "sheshinbwa",
  balance:4000
}];

const startMenu = ()=>{
   menu.startState({
     next:{
       '':()=>{
        const {phoneNumber} = menu.args;
        
        const validUser = users.find(user=> user.phoneNumber === phoneNumber);
        
        if (validUser) {
         return "mainMenu";
      }
        return "startOnboarding";
      }}
    });
};

module.exports = startMenu;