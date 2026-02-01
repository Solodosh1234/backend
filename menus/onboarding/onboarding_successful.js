const menu = require('../menu.js');
const bcrypt = require('bcryptjs');
const user = require('../../models/user.js');
const session = require('../../session_store.js');

const onboardingSuccess = ()=>{
  menu.state('onboardSuccess',{
    run:async ()=>{
      
    const {sessionId,phoneNumber} = menu.args
    const sessionData = await session.get(sessionId)
    const {firstname,lastname,email} = sessionData
    const salt = await bcrypt.genSalt(10)
    const hashPin = await bcrypt.hash(menu.val,salt)
    try {
      await user.insertOne({
      firstname,
      lastname,
      email,
      phoneNumber,
      pin:hashPin
    }).then(result=>{
      if (!result) {
       return menu.end('Your registration failed, please try again.')
      }
      menu.end(`Yello ${firstname} your registration was successful`)
    })
      
    } catch (err) {
      menu.end('An internal server error try again');
    }
    }
  });
};

module.exports = onboardingSuccess;