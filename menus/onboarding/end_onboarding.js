const menu = require('../menu.js');

const endOnboarding = ()=>{
  menu.state('endOnboarding',{
    run:()=>{
      menu.con('Yello you quit the registration process, we love to have you back at pawadem');
    }
  });
};

module.exports = endOnboarding;