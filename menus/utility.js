const axios = require('axios')
require('dotenv').config()

const util = axios.create({
  baseURL:"http://localhost:3000",
  timeout: 10000,
  headers: {
    'x-secret-key': process.env.APP_SECRET_KEY
  }
});

const buyAirtime = async (data)=>{
  try {
    return await util.post('/buy/airtime',data)
  } catch (err) {
    throw err
  }
}

const buyData = async (data)=>{
  try {
    return await util.post('/buy/data',data)
  } catch (err) {
    throw err
  }
}
const createWallet = async (data)=>{
  try {
    return await util.post('/create/account',data)
  } catch (err) {
    throw err
  }
}

const verifyAccount = async (data)=>{
  try {
    return await util.post('/verify/account',data)
  } catch (err) {
    throw err
  }
}



const generateTransactionId =() =>{
  const timestamp = Date.now(); // current time in milliseconds
  const randomNum = Math.floor(Math.random() * 10000); // random number between 0 and 9999
  return `txn${timestamp}${randomNum}`;
}

// Example usage:
const transactionId = generateTransactionId();
console.log(transactionId); // e.g., txn16751123456789123
module.exports = {
  buyAirtime,
  buyData,
  createWallet,
  verifyAccount,
  generateTransactionId
}