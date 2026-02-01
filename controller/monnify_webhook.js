const crypto = require('crypto');
const user = require('../models/user.js');
const deposit = require('../models/deposit_reference.js');

const monnifyWebhook = async (req, res) => {
  try {
    const receivedSignature = req.headers['monnify-signature'];
    const requestBody = JSON.stringify(req.body);
    const secretKey = process.env.MONNIFY_SECRET_KEY;

    const hash = crypto.createHmac('sha512', secretKey).update(requestBody).digest('hex');

    if (
      !receivedSignature ||
      receivedSignature.length !== hash.length ||
      !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(receivedSignature))
    ) {
      console.log('Unauthorized Webhook Call - Invalid Signature');
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const eventData = req.body;

    if (
      eventData.eventType === 'TRANSACTION_SUCCESSFUL' &&
      eventData.eventData &&
      typeof eventData.eventData.amountPaid === 'number' &&
      eventData.eventData.amountPaid > 0
    ) {
      const { transactionReference, accountReference, amountPaid, settlementAmount } = eventData.eventData;

      console.log(`Payment received for Reserved Account: ${accountReference}. Amount: ${amountPaid}`);

      // IDENTITY CHECK: See if this transaction has already been processed
      const existingDeposit = await deposit.findOne({ transactionReference });
      if (existingDeposit) {
        console.log(`Duplicate transaction detected: ${transactionReference}, skipping processing.`);
        return res.status(200).json({ status: 'success', message: 'Transaction already processed' });
      }

      // Update user balance atomically
      const updatedUser = await user.findOneAndUpdate(
        { accountReference },
        { $inc: { balance: Number(settlementAmount) } },
        { new: true }
      );

      if (!updatedUser) {
        console.error(`User not found with accountReference: ${accountReference}`);
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }

      // Record the deposit transaction
      await deposit.create({
        userId: updatedUser._id,
        transactionReference,
        amountPaid,
        settlementAmount,
        date: new Date()
      });

      console.log(`User balance updated for accountRef ${accountReference}`);
      return res.status(200).json({ status: 'success' });
    }


  } catch (err) {
    console.error('Webhook processing error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = monnifyWebhook;