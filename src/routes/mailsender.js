var express = require('express');
// const emptyRooms = require('../controllers/rooms');
const { sendMail } = require('../services/smtp/mailSender');
var router = express.Router();


const mailSender = router.get('/sending', async (req, res) => {
    try {
        console.log("Sending mails ....")
        // Assuming mydata is populated somewhere before calling sendMail
        sendMail((error, result) => {
            if (error) {
                console.error('Error:', error);
                res.json({success: false, message: 'Some emails failed to send' });
            } else {
                // console.log('Result:', result);
                res.json({success: true, message: 'All emails sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { mailSender };


