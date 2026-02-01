const menu = require('./menu.js')
const user = require('../../models/user.js')

const account = ()=>{
  menu.state('account',{
    run:()=>{
      menu.con('Account info \n2. Account balance \n3. Reset pin');
    },
    next:{
      "1":"accountInfo",
      "2":"accountBalance",
      "3":"resetPin",
    }
  });
};

module.exports = account;