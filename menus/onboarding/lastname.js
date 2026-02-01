const menu = require('../menu.js');
const session = require('../../session_store.js');

const lastname = ()=>{
  menu.state('lastname',{
    run: async ()=>{
      const {sessionId} = menu.args
      await  session.update(sessionId,'firstname',menu.val)
      menu.con('Enter lastname');
    },
    next:{
      '*\\w+':'email'
    },
    defaultNext:'Invalid input'
  });
};

module.exports = lastname;