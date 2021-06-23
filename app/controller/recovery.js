require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { body } = req;
  try {
    let mailOptions = {
      from: body.from,
      to: body.to,
      subject: body.subject,
      text: body.text,
    };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendEmail,
};
