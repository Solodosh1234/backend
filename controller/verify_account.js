const axios = require('axios')
const user = require('../models/user.js');
require('dotenv').config()

const url = process.env.MONNIFY_BASE_URL + '/api/v1/vas/nin-details'
const verifyAccount = async (req,res)=>{
  const token = req.monnifyToken
  const {nin,phoneNumber} = req.body
  
  const validUser = await user.findOne({phoneNumber})
  const {firstname,lastname} = validUser
  if (!validUser.verify) {
    await axios.post(url,{
    nin
  },{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + token
    }
  }).then(result=>{
    const {lastName,firstName,middleName,dateOfBirth,gender}
    await user.findOneAndUpdate({phoneNumber},{
      verify:true,
      dateOfBirth,
      gender
    }).then(result=>{
      if (result) {
        if (lastname === lastName || lastname === firstName || lastname=== middleName && firstname === firstName || firstname === lastName || firstname === middleName) {
         return  res.status(201).json({
            status:'verify',
            message:'Your account is verify'
          })
        }
        res.status(403).json({
          status:'notVerify',
          message:'Your account is not verify'
        })
      }
      res.status(500).json({
          status:'failed',
          message:'server error occurred'
        })
    })
  })
  }
  
}

module.exports = verifyAccount
