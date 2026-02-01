const menu = require('../../menu.js') ;

const dataOthers = ()=>{
  menu.state('dataOthers',{
    run:()=>{
      menu.con('Enter recipient phone number');
    },
    next:{
      '*^[0-9]{11}$':'dataOthersPlan'
    }
  });
};
module.exports = dataOthers