const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.simply.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 't1@brfsmedby.se',
        pass: 'saeedA93',
    },
});

async function register(req, res) {
    const { name, email, message } = req.body;
    // Set up the email data
    const mailOptions = {
        from: 't1@brfsmedby.se',
        to: 't1@brfsmedby.se',
        subject: `New message from ${name}`,
        html: `<div style="background-color: gray; padding: 20px; color: black;">
        <p style="margin-bottom: 10px;"><strong>Sender:</strong> ${email}</p>
        <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
        <p style="margin-bottom: 10px;"><strong>Message:</strong><br>${message.split('\n').join('<br>')}</p>
    </div>`,
        //  can use html: `<p>${message}</p>` to send as HTML
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Error sending email', error });
        }
        return res.status(200).json({ message: 'Email successfully sent', info });
    });
};


module.exports = { register }