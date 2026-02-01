const axios = require('axios');
const mongoose = require('mongoose');
const transaction = require('../models/transaction'); // adjust path if needed
require('dotenv').config();

const ebill_baseurl = process.env.EBILL_BASEURL;
const buyAirtime_url = `${ebill_baseurl}/api/v2/airtime`;

const buyAirtime = async (req, res) => {
  const { userId, request_id, phone, service_id, amount } = req.body;
  const token = req.ebillToken;

  try {
    const response = await axios.post(
      buyAirtime_url,
      {
        request_id,
        phone,
        service_id,
        amount
      },
      {
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + token
        }
      }
    );

    const apiMessage = response.data.message;
    const apiData = response.data.data || {};

    const newTransaction = {
      userId: mongoose.Types.ObjectId(userId),
      order_id: request_id,
      status: '',
      name: apiData.service_name || '',
      type: 'airtime',
      amount,
      date: new Date()
    };

    if (apiMessage === "ORDER PROCESSING") {
      newTransaction.status = 'PENDING';
      await transaction.create(newTransaction);

      return res.status(200).json({
        status: "PENDING",
        message: `Your purchase of ${apiData.amount} naira ${apiData.service_name} airtime for ${apiData.phone} is pending, please try again later`
      });
    }

    if (apiMessage === "ORDER COMPLETED") {
      newTransaction.status = 'SUCCESSFUL';
      await transaction.create(newTransaction);

      return res.status(200).json({
        status: "SUCCESSFUL",
        message: `Your purchase of ${apiData.amount} naira ${apiData.service_name} airtime for ${apiData.phone} was successful`
      });
    }

    if (apiMessage === "ORDER REFUNDED") {
      newTransaction.status = 'FAILED';
      await transaction.create(newTransaction);

      return res.status(200).json({
        status: "FAILED",
        message: `Your purchase of ${apiData.amount} naira ${apiData.service_name} airtime for ${apiData.phone} failed, please try again later`
      });
    }

    newTransaction.status = 'ERROR';
    await transaction.create(newTransaction);

    return res.status(500).json({
      status: "ERROR",
      message: `Sorry, an error occurred on the server`
    });

  } catch (error) {
    console.error('buyAirtime error:', error);

    // Optional: Save failed transaction here if you want

    return res.status(500).json({
      status: "ERROR",
      message: "Server error occurred while processing your airtime purchase"
    });
  }
};

module.exports = buyAirtime;