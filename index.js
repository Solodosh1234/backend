const express = require('express');
const path = require('path');
const app = express();

const services = require('./routes/services.js');
const ussdCallbackUrl = require('./routes/ussd.js');
const {getPlan} = require('./middlewares/dataPlans_updater.js');
require('dotenv').config();

const ebill_baseurl = process.env.EBILL_BASEURL;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(ussdCallbackUrl);
app.get('/simulator',(req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(services);

app.listen(3000,'0.0.0.0',async ()=>{
 // await getPlan()
  console.log('server is running');
});