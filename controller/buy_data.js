const axios = require('axios');
const mongoose = require('mongoose');
const transaction = require('../models/transaction'); // Adjust path if needed

const ebill_baseurl = process.env.EBILL_BASEURL;
const buyData_url = `${ebill_baseurl}/api/v2/data`;

const buyData = async (req, res) => {
  const { userId, request_id, phone, service_id, variation_id } = req.body;
  const token = req.ebillToken;

  try {
    const response = await axios.post(
      buyData_url,
      {
        request_id,
        phone,
        service_id,
        variation_id
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

    // Prepare transaction data to save
    const newTransaction = {
      userId: mongoose.Types.ObjectId(userId),  // ensure it's ObjectId
      order_id: request_id,
      status: '',
      name: apiData.data_plan || '',
      type: 'data',
      amount: api.amount  // no amount in current response, add if available
      date: new Date()
    };

    if (apiMessage === "ORDER PROCESSING") {
      newTransaction.status = 'PENDING';
      await transaction.create(newTransaction);

      return res.status(200).json({
        status: "PENDING",
        message: `Your purchase of ${apiData.data_plan} for ${apiData.phone} is pending, please try again later`
      });
    }

    if (apiMessage === "ORDER COMPLETED") {
      newTransaction.status = 'SUCCESSFUL';
      await transaction.create(newTransaction);

      return res.status(200).json({
        status: "SUCCESSFUL",
        message: `Your purchase of ${apiData.data_plan} for ${apiData.phone} was successful`
      });
    }

    if (apiMessage === "ORDER REFUNDED") {
      newTransaction.status = 'FAILED';
      await transaction.create(newTransaction);

      return res.status(200).json({
        status: "FAILED",
        message: `Your purchase of ${apiData.data_plan} for ${apiData.phone} failed, please try again later`
      });
    }

    // Default fallback: record error status
    newTransaction.status = 'ERROR';
    await transaction.create(newTransaction);

    return res.status(500).json({
      status: "ERROR",
      message: `Sorry, an error occurred on the server`
    });

  } catch (error) {
    console.error('buyData error:', error);

    // You could optionally save failed transaction here as well

    return res.status(500).json({
      status: "ERROR",
      message: "Server error occurred while processing your purchase"
    });
  }
};

module.exports = buyData;