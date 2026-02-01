const menu = require('../menu.js');
const session = require('../../session_store.js');

const email = ()=>{
  menu.state('email',{
    run:async ()=>{
      const {sessionId} = menu.args
      await  session.update(sessionId,'lastname',menu.val)
      menu.con('Enter your email');
    },
    next:{
      '*\\w+@\\w+\\.\\w+':'pin'
    },
    defaultNext:'Invalid input'
  });
};

module.exports = email;