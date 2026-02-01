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

//self
const dataSelf = require('./self/data/data_self.js');
const dataSelfPin = require('./self/data/data_self_pin.js');
const dataSelfEnd = require('./self/data/data_self_end.js');

const airtimeOthers = require('./others/airtime/airtime_others.js');
const airtimeOthersAmount = require('./others/airtime/airtime_others_amount.js');
const airtimeOthersValidate = require('./others/airtime/airtime_others_validate.js');
const airtimeOthersPin= require('./others/airtime/airtime_others_pin.js');
const airtimeOthersEnd = require('./others/airtime/airtime_others_end.js');

const dataOthersPlan = require('./others/data/data_others_plan.js');
const dataOthers = require('./others/data/data_others.js');
const dataOthersPin = require('./others/data/data_others_pin.js');
const dataOthersEnd = require('./others/data/data_others_end.js');


const accountBalance = require('./account/account_balance.js')
const accountInfo = require('./account/account_info.js')
const createAccount = require('./account/create_account.js')
const generateAccount = require('./account/generate_account.js')
const resetPin = require('./account/reset_pin.js')
const resetPinVerify = require('./account/reset_pin_verify.js')
const setNewPin = require('./account/set_new_pin.js')
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

accountBalance()
accountInfo()
createAccount()
generateAccount()
resetPin()
resetPinVerify()
setNewPin()

// initialised airtime states
airtime();

//airtime self 
airtimeSelf();
airtimeSelfValidate();
airtimeSelfPin();
airtimeSelfEnd();


//  airtime others

airtimeOthers()
airtimeOthersAmount()
airtimeOthersValidate()
airtimeOthersPin()
airtimeOthersEnd()
// initialised data states

data();

//data self
dataSelf()
dataSelfPin()
dataSelfEnd()

//data others
dataOthers()
dataOthersPlan()
dataOthersPin()
dataOthersEnd()

//console.log(ussdMenus)
module.exports = ussdMenus;