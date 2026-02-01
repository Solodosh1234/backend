const axios = require('axios')
require('dotenv').config()

const monnify_base_url = process.env.MONNIFY_BASE_URL
const monnify_api_key = pprocess.envMONNIFY_API_KEY
const monnify_secret_key = process.env. MONNIFY_SECRET_KEY
const text =`${monnify_api_key}:${monnify_secret_key}`

let token= null
let expiryTime = null

const url =`${monnify_base_url}/api/v1/auth/login`


const base64Key = Buffer.from(text).toString('base64')
const makeMonnifyAuthRequest = async ()=>{
  try {
  let response = await axios.post(url,{},{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Basic ' + base64Key
    }
  })
  
  token = response.data.responseBody.accessToken
  expiryTime = Date.now() + response.data.responseBody.expiresIn * 1000
  console.log('✅ monnify token obtained');
  return token
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}  

const renewMonnifyToken = async (req,res,next)=>{
  try {
    if (!token || !expiryTime || expiryTime - Date.now() < 10 * 60 * 1000) {
      await makeMonnifyAuthRequest();
    }

    // attach token to request
    req.monnifyToken = token;
    next();

  } catch (err) {
    res.status(500).json({ error: 'monnify authentication failed' });
  }
}

module.exports = renewMonnifyToken