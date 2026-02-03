const menu = require('../menu.js');
const bcrypt = require('bcryptjs');
const user = require('../../models/user.js');
const session = require('../../session_store.js');

const onboardingSuccess = () => {
  menu.state('onboardSuccess', {
    run: async () => {
      try {
        const { sessionId, phoneNumber } = menu.args;

        const sessionData = await session.get(sessionId);
        if (!sessionData) {
          return menu.end('Session expired. Please start again.');
        }

        const { firstname, lastname, email } = sessionData;

        const salt = await bcrypt.genSalt(10);
        const hashPin = await bcrypt.hash(menu.val, salt);

        const result = await user.create({
          firstname,
          lastname,
          email,
          phoneNumber,
          pin: hashPin,
          date: new Date()
        });

        if (!result) {
          return menu.end('Your registration failed, please try again.');
        }

        menu.end(`Yello ${firstname}, your registration was successful 🎉`);

      } catch (err) {
        console.error(err);
        menu.end('An internal server error. Please try again.');
      }
    },
  });
};

module.exports = onboardingSuccess;