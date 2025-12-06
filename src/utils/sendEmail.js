require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = async function sendEmail(to, subject, html) {
    try {
        await transporter.sendMail({
            from: `"Your App" <${process.env.ADMIN_EMAIL}>`,
            to,
            subject,
            html,
        });
    } catch (err) {
        console.error("Email xatosi:", err);
        throw err;
    }
};
