const ussdCallbackUrl  = require('express').Router();
const menu = require('../menus/menu.js');
const ussdMenus = require('../menus/ussd_menus.js');
const UserSession = require('../session_store.js')
ussdCallbackUrl.post('/ussd',(req,res)=>{
  const args ={
    phoneNumber : req.body.phoneNumber,
    sessionId : req.body.sessionId,
    serviceCode : req.body.serviceCode,
    Operator : req.body.networkCode,
    text : req.body.text
  };
  menu.run(args,(resMsg)=>{
    const {sessionId} = menu.args;
    UserSession.set(sessionId,{})
    res.status(200).send(resMsg);
  });
});

module.exports = ussdCallbackUrl;