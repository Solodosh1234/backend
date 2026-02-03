const menu = require('./menu.js');
const user = require('../models/user.js')

const mainMenu = ()=>{
  menu.state('mainMenu',{
    run:()=>{
      menu.con('1. Account info \n2. Buy airtime \n3. Buy data');
    },
    next:{
      "1":async ()=>{
        const {phoneNumber} = menu.args
        const existedUser = await user.findOne({phoneNumber})
        if (!existedUser.hasAnAccount) {
          return 'generateAccount'
        }
        return 'account'
      },
      "2":"airtime",
      "3":"data"
    }
  });
};

module.exports = mainMenu;