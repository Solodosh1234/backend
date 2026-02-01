const axios = require('axios');
require('dotenv').config();

const ebill_baseurl = process.env.EBILL_BASEURL;
const username = process.env.EBILL_USERNAME;
const password = process.env.EBILL_PASSWORD;

const auth_url = `${ebill_baseurl}/jwt-auth/v1/token`;

let token = null;
let expiryTime = null;

/**
 * Authenticate & get new token
 */
const sendAuthRequest = async () => {
  try {
    const response = await axios.post(
      auth_url,
      {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    token = response.data.token;

    // JWT usually expires in seconds
    const expiresIn = response.data.expires_in || 3600;

    expiryTime = Date.now() + expiresIn * 1000;

    console.log('✅ Ebills token obtained');
    return token;
  } catch (error) {
    console.error(
      '❌ Ebills auth failed:', error
    );
    throw error;
  }
};

/**
 * Middleware to renew token if close to expiry
 */
const renewEbillToken = async (req, res, next) => {
  try {
    if (!token || !expiryTime || expiryTime - Date.now() < 10 * 60 * 1000) {
      await sendAuthRequest();
     return next()
    }

    // attach token to request
    req.ebillToken = token;
    next();

  } catch (err) {
    res.status(500).json({ error: 'Ebills authentication failed' });
  }
};

module.exports = renewEbillToken;