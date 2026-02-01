const crypto = require('crypto');
const transaction = require('../models/transaction.js');
const user = require('../models/user.js');
require('dotenv').config();

const USER_PIN = process.env.EBILL_PASSWORD;

const ebillWebHook = async (req, res) => {
  try {
    const signature = req.headers['x-signature'] || '';
    const payload = req.rawBody.toString();
    const computedSignature = crypto.createHmac('sha256', USER_PIN).update(payload).digest('hex');

    if (
      signature.length !== computedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(computedSignature), Buffer.from(signature))
    ) {
      return res.status(403).json({ status: "error", message: "Invalid signature" });
    }

    console.log("Webhook verified:", req.body);

    const { message, data } = req.body;
    const { order_id, amount } = data;

    const checkTransaction = await transaction.findOne({ order_id });
    if (!checkTransaction) {
      return res.status(404).json({ status: "no transaction with such order_id" });
    }

    // Idempotency check
    if (checkTransaction.status === message) {
      return res.status(200).json({ status: "already processed" });
    }

    const userId = checkTransaction.userId;

    if (message === "ORDER PROCESSING") {
      await transaction.findOneAndUpdate({ order_id }, {
        status: 'PENDING',
      });
      return res.status(200).json({ status: "success" });
    }

    if (message === "ORDER COMPLETED") {
      await user.findOneAndUpdate({ _id: userId }, {
        $inc: { balance: -Number(amount) }
      });

      await transaction.findOneAndUpdate({ order_id }, {
        status: 'SUCCESSFUL'
      });

      return res.status(200).json({ status: "success" });
    }

    if (message === "ORDER REFUNDED") {
      if (checkTransaction.status === 'SUCCESSFUL') {
        await user.findOneAndUpdate({ _id: userId }, {
          $inc: { balance: Number(amount) }
        });
      }

      await transaction.findOneAndUpdate({ order_id }, {
        status: 'FAILED'
      });

      return res.status(200).json({ status: "success" });
    }

    // Handle unexpected message values
    return res.status(400).json({ status: "error", message: "Unknown message type" });

  } catch (err) {
    console.error("Webhook processing error:", err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = ebillWebHook;