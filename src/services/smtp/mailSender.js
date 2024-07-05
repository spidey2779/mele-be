const nodemailer = require('nodemailer');
require('dotenv').config();

let mydata;

const accessData = (Data) => {
    mydata = Data
 
}

const sendMail = async ( callback ) => {

    let successCount = 0; // Counter for successful emails
    let errorCount = 0; // Counter for failed emails
    
    mydata.forEach(entry => {
        Object.keys(entry).forEach(room => {
            entry[room].forEach(detail => {
                // accessData(detail, room);
                try {

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD,
                        }
                    });

                    // Email message content
                    let mailContent = `Dear Student,\n\nHere are your exam details:\n` +
                        `ROLL: ${detail.roll}\n` +
                        `ROOM: ${room}\n` +
                        `SEAT NO: ${detail.seatNo}\n` +
                        `YEAR: ${detail.year}\n` +
                        `DEPARTMENT: ${detail.department}\n` +
                        `SUBJECT CODE: ${detail.subCode}\n` +
                        `EXAM DATE: ${detail.examDate}\n` +
                        `EXAM TIME: ${detail.examTime}\n\n` +
                        `ALL THE BEST`;

                    var mailOptions = {
                        from: 'MITS EXAMINATION SECTION',
                        to: `${detail.roll}@mits.ac.in`,
                        subject: `${room}`,
                        text: mailContent
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            errorCount++;
                        } else {
                            console.log('Email sent: ✅ ' + info.response);
                            successCount++;
                        }

                        // Check if all emails have been sent
                        if (successCount + errorCount === mydata.length) {
                            if (errorCount === 0) {
                                // All emails sent successfully
                                console.log("Result: All emails sent successfully 🎉 ")
                                callback(null, 'All emails sent successfully');
                            } else {
                                // Some emails failed to send
                                callback(`${errorCount} emails failed to send`, null);
                            }
                        }
                    });
                } catch (error) {
                    console.log(error);
                    errorCount++;
                }
            });
        });
    });
} 

module.exports = { sendMail, accessData };
