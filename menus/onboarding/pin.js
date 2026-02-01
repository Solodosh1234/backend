const menu = require('../menu.js');
const session = require('../../session_store.js');

const pin = ()=>{
  menu.state('pin',{
    run:async ()=>{
      const {sessionId} = menu.args
      let info = await session.get(sessionId)
      console.log(info)
      await  session.update(sessionId,'email',menu.val)
      menu.con('Create a 4 digit transaction pin');
    },
    next:{
      '*^[0-9]{4}$':"onboardSuccess"
    },
    defaultNext:'Invalid input'
  });
};

module.exports = pin;