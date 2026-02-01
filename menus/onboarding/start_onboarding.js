const menu = require('../menu.js');

const startOnboarding = ()=>{
  menu.state('startOnboarding',{
    run:()=>{
      menu.con('welcome to pawadem, choose an option to continue \n1. quit registration \n2. start registration');
    },
    next:{
      '1':'endOnboarding',
      '2':'firstname'
    },
    defaultNext:'Invalid input'
  });
};

module.exports = startOnboarding;