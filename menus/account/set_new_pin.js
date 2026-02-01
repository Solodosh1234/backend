const menu  = require('../menu.js');
const bcrypt = require('bcryptjs')
const user  = require('../../models/user.js');
const setNewPin = ()=>{
  menu.state('setNewPin',{
    run: async ()=>{
      const {phoneNumber}= menu.args
      const salt = await bcrypt.genSalt(10)
      const hashPin = await bcrypt.hash(menu.val,salt)
      try {
      await user.findOneAndUpdate({phoneNumber},{
        pin:hashPin
      }).then(res=>{
        if (!res) {
         return menu.end('Failed to create new pin')
        }
        menu.end('Your new pin has been created')
      })
    } catch (err) {
      console.error('Error:', err);
    }
    }
  });
};

module.exports = setNewPin