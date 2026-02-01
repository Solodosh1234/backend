const menu = require('./menu.js')

const airtime = ()=>{
  menu.state('airtime',{
    run:()=>{
      menu.con('1. For self \n2. For others')
    },
    next:{
      '1':'airtimeSelf',
      '2':'airtimeOthers',
    }
  })
};

module.exports = airtime;