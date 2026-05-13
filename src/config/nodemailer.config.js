const nodemailer = require('nodemailer');

const trans = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function sendEmail(to, subject, Content) {
    const option = {
        from: `Thông báo <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        text: Content
    };
    return trans.sendMail(option);
}

module.exports = sendEmail;