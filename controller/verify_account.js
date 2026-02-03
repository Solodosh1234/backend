const axios = require('axios');
const user = require('../models/user.js');
require('dotenv').config();

const url = process.env.MONNIFY_BASE_URL + '/api/v1/vas/nin-details';

const verifyAccount = async (req, res) => {
  try {
    const token = req.monnifyToken;
    const { nin, phoneNumber } = req.body;
    console.log('NIN:', nin, 'Phone:', phoneNumber);

    const validUser = await user.findOne({ phoneNumber });
    if (!validUser || validUser.verify) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found or already verified'
      });
    }

    const { firstname, lastname } = validUser;

    // Call Monnify NIN API ✅ FIXED: Proper response handling
    const ninResponse = await axios.post(url, { nin }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    // ✅ FIXED: Safe destructuring with fallback
    const ninData = ninResponse.data.response || ninResponse.data || {};
    const { 
      lastName = '', 
      firstName = '', 
      middleName = '', 
      dateOfBirth = '', 
      gender = '' 
    } = ninData;

    console.log('NIN Response:', ninData); // Debug log

    // Update user in DB
    const updatedUser = await user.findOneAndUpdate(
      { phoneNumber },
      {
        verify: true,
        dateOfBirth,
        gender
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({
        status: 'failed',
        message: 'Failed to update user'
      });
    }

    // ✅ FIXED: Proper name matching logic
    const namesMatch = (
      [lastName, firstName, middleName].includes(lastname) &&
      [firstName, lastName, middleName].includes(firstname)
    );

    if (namesMatch) {
      return res.status(201).json({
        status: 'verify',
        message: 'Your account is verified'
      });
    } else {
      return res.status(403).json({
        status: 'notVerify',
        message: `Name mismatch. DB: ${firstname} ${lastname} | NIN: ${firstName} ${lastName}`
      });
    }

  } catch (error) {
    // ✅ FIXED: Detailed error logging
    console.error('Full verification error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    res.status(500).json({
      status: 'failed',
      message: error.response?.data?.message || error.message || 'Verification failed'
    });
  }
};

module.exports = verifyAccount;