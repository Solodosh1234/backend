const monnifyWebhook = require('express').Router();
const createWallet = require('../controller/createWallet.js');
const verifyAccount = require('../controller/verifyAccount.js');
const monnifyWebhook = require('../controller/monnifyWebhook.js');
const verifyKey = require('../middlewares/verify_key.js');
const renewMonnifyToken = require('../middlewares/ebill_auth.js');


monnifyWebhook.use(renewMonnifyToken);
monnifyWebhook.post('/webhook/deposit',monnifyWebhook)

monnifyWebhook.use(verifyKey);

monnifyWebhook.post('/create/account',createWallet)
monnifyWebhook.post('/verify/account',verifyAccount)


module.exports = monnifyWebhook
