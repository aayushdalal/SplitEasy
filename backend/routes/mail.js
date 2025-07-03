const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

router.post('/send-settlements', async (req, res) => {
  const { participants, settlements, upiMap } = req.body;

  try {
    const emailMap = {};
    participants.forEach(({ name, email }) => {
      emailMap[name] = email;
    });

    for (const { from, to, amount } of settlements) {
      const toUpi = upiMap[to] || 'No UPI ID provided';
      const toEmail = emailMap[from]; // email should go to sender

      if (!toEmail) continue;

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: toEmail,
        subject: 'SplitEasy: Payment Due',
        text: `${from},\n\nYou owe ₹${amount} to ${to}.\n\nPay via UPI: ${toUpi}\n\nThanks,\nSplitEasy`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});

module.exports = router;
