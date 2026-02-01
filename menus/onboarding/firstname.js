const menu = require('../menu.js');

const firstname = ()=>{
  menu.state('firstname',{
    run:()=>{
      menu.con('Enter firstname');
    },
    next:{
      '*\\w+':'lastname'
    },
    defaultNext:'Invalid input'
  });
};

module.exports = firstname;