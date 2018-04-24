'use-strict'
import mailer from 'nodemailer';
import crypto from 'crypto';
import async from 'async';
/*=============================================>>>>>
= smtp protocol =
===============================================>>>>>*/
export const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'dev.luiscl32@gmail.com',
      pass: 'DevLuiscl32'
    }
  });

/*=============================================>>>>>
= mailOptions =
===============================================>>>>>*/
export const mailOptions = (user ,email, resetPasswordToken) => {
  return {
    to: 'luiscl32@gmail.com',
    subject: 'Recuperacion de contraseña',
    text: `Hola ${user.username}, hemos detectado que has olvidado tu contraseña. \n
          Accede al siguiente enlace para crear una nueva contraseña. \n\n\n
          http://localhost:3000/api/resetpassword/${resetPasswordToken}/${user._id}`
  }
}
