const services = require('express').Router();
const buyAirtime = require('../controller/buy_airtime.js');
const buyData = require('../controller/buy_data.js');
const ebillWebhook = require('../controller/ebill_webhook.js');
const renewEbillToken = require('../middlewares/ebill_auth.js');
const verifyKey = require('../middlewares/verify_key.js');
const updater = require('../middlewares/dataPlans_updater.js')

services.use(renewEbillToken);
//services.use(updater)
//services.use(verifyKey);

services.post('/ebill/webhook',ebillWebhook);
services.post('/buy/airtime',buyAirtime);
services.post('/buy/data',buyData);


module.exports = services;