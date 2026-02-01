const menu = require('../../menu.js');


const airtimeOthers = ()=>{
  menu.state('airtimeOthers',{
    run:()=>{
      menu.con('Enter recipient phone number')
    },
    next:{
      '*^[0-9]{11}$':'airtimeOthersAmount'
    }
  });
};


module.exports = airtimeOthers