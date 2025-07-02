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
  const { participants, settlements, upiId } = req.body;

  try {
    for (const { name, email } of participants) {
      const dues = settlements
        .filter(s => s.from === name)
        .map(s => `Pay ₹${s.amount} to ${s.to}`)
        .join('\n');

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'SplitEasy Settlement Summary',
        text: `${name},\n\nHere’s what you owe:\n${dues}\n\nPay via UPI: ${upiId}\n\nThanks,\nSplitEasy`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true, message: "Emails sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send emails." });
  }
});

module.exports = router;
