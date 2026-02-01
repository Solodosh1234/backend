const ussdMenus = require('./menu.js');
const startMenu = require('./start_menu.js');
const mainMenu = require('./main_menu.js');

// require onboarding states
const startOnboarding = require('./onboarding/start_onboarding.js');
const endOnboarding = require('./onboarding/end_onboarding.js');
const onboardingSuccess = require('./onboarding/onboarding_successful.js');
const firstname = require('./onboarding/firstname.js');
const lastname = require('./onboarding/lastname.js');
const email = require('./onboarding/email.js');
const pin = require('./onboarding/pin.js');


//require airtime states
const airtime = require('./airtime.js');

//airtime Self
const airtimeSelf= require('./self/airtime/airtime_self.js');
const airtimeSelfValidate= require('./self/airtime/airtime_self_validate.js');
const airtimeSelfPin = require('./self/airtime/airtime_self_pin.js');
const airtimeSelfEnd = require('./self/airtime/airtime_self_end.js');

// require data states

const data = require('./data.js');



const dataOthersPlan = require('./others/data/data_others_plan.js');
const dataOthers = require('./others/data/data_others.js');
const dataOthersPin = require('./others/data/data_others_pin.js');
const dataOthersEnd = require('./others/data/data_others_end.js');

// initialised onboarding states
startMenu();
mainMenu();
startOnboarding();
endOnboarding();
onboardingSuccess();
firstname();
lastname();
email();
pin();

// initialised airtime states
airtime();
airtimeSelf();
airtimeSelfValidate();
airtimeSelfPin();
airtimeSelfEnd();

// initialised airtime states

data();

//data self


//data others
dataOthers()
dataOthersPlan()
//dataOthersPin()
dataOthersEnd()

//console.log(ussdMenus)
module.exports = ussdMenus;