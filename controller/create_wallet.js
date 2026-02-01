const axios = require('axios')
const user = require('../models/user.js')
const accounts = require('../models/accounts.js')
require('dotenv').config()

let monnify_base_url = process.env.MONNIFY_BASE_URL
const contractCode = process.env.MONNIFY_CONTRACT_CODE
const url = `${monnify_base_url}/api/v2/bank-transfer/reserved-accounts`

const createWallet = async (req,res)=>{
  const token = req.monnifyToken
  const {phoneNumber} = req.body
  const validUser = await user.findOne({phoneNumber})
  
  const accountReference = validUser._id
  const {firstname,lastname,email,phoneNumber,nin}= validUser
  let customerName = lastname + ' ' + firstname
  axios.post(url,{
    accountReference,
    accountName: 'Pawadem',
    currencyCode: 'NGN',
    contractCode,
    customerEmail: email,
    customerName,
    nin,
    getAllAvailableBanks: 'true',
    preferredBanks: ['50515']
  },{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + token
    }
  }).then(result=>{
  if (result.data.responseSuccessful === true) {
    const accounts = result.data.responseBody.accounts
    
    accounts.forEach((account) => {
      const {bankName,accountNumber,accountName} = account
      await user.findOneAndUpdate({userId:validUser._id },{
        userId:validUser._id,
        account_reference:validUser._id,
        bank:bankName,
        accountName,
        accountNumber })
      
   res.status(201).json({
     status:'successful',
     message:'Account creation was successful'
   })
    })
  }
  res.status(500).json({
    status:'failed',
    message:'account creation failed'
  })
    
  })
}

module.exports = createWallet
