const menu = require('./menu.js')
const userSession = require('../session_store.js')
const data = ()=>{
  menu.state('data',{
    run:async ()=>{
      const {sessionId} = menu.args
      await userSession.update(sessionId,'page',1)
      menu.con('1. For self \n2. For others');
    },
    next:{
      "1":"dataSelf",
      "2":"dataOthers"
    }
  });
};

module.exports = data;