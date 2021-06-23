require("dotenv").config();
const nodemailer = require("nodemailer");
const model = require("../lib/models");

const sendEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await model.Usuario.findOne({ where: { email: email } });
    if (user != null) {
      //const password = Math.floor(Math.random() * 10000000);
      //user.update({ password: password });
      let mailOptions = {
        from: process.env.MAIL_COMBI49,
        to: email,
        subject: "Recuperacion de contraseña",
        text:
          "Hola " +
          user.nombre +
          " " +
          user.apellido +
          " ha solicitado recuperr la contraseña\nEsta es su clave de acceso: " +
          user.password,
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
          res.status(200).json({
            message: "Se ha enviado la clave de recuperacion a su cuenta",
          });
        }
      });
    } else {
      res
        .status(400)
        .json({ message: "El usuario con ese email no existe en el sistema" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendEmail,
};
