'use-strict'

import mongoose from 'mongoose';
import User from '../Models/user.js';
import service from '../Services';
import bcrypt from 'bcrypt-nodejs';
import {smtpTransport, mailOptions} from '../Lib/mailer';
/*=============================================>>>>>
= REGISTRO =
===============================================>>>>>*/

function signUp(req,res) {
  const user = new User({
    username: req.body.username,
    email:    req.body.email,
    password: req.body.password,
  });

    user.save((err) => {
    if(err) return res.status(500).send({message: `Ocurrio un error al registrar al usuario ${err}`})

    res.status(200).send({message: 'Usuario registrado correctamente'});
  });
}

/*=============================================>>>>>
= LOGIN =
===============================================>>>>>*/

function signIn(req,res,next) {

  let username = req.body.username;
  let email    = req.body.email;
  let password = req.body.password;



  User.findOne({email: email}, (err,user) =>{
    if(err) return res.status(500).send({message: `Ha ocurrido un error al iniciar sesion ${err}`});
    if(!user) return res.status(404).send({message: 'No se ha encontrado el usuario'})
    console.log(user);

    user.comparePassword(password, (err,results) =>{
      if(err) return res.status(500).send({message: `Ha ocurrido un error: ${err}`})
      if(!results) return res.status(401).send({message: 'contraseña incorrecta'});
        res.status(200).send({
          message: `login correcto bienvenido ${username}`,
          token:  service.createToken(user),
          _id: user._id
        })
    })

  });
}

/*=============================================>>>>>
= PUT =
===============================================>>>>>*/
  function modifiedProfile(req,res) {
    let userId = req.params.userId;
    let preUpdate = req.body;
    let update = service.encriptPassword(preUpdate.password);


    User.findByIdAndUpdate(userId,
      {
        username: preUpdate.username,
        email: preUpdate.email,
        password: update
      },
      (err, userModified) =>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error: ${err}`});
        if(!user) return res.status(404).send({message: 'No se ha encontrado el usuario'});
            res.status(200).send({user: userModified});
      });
  }

/*=============================================>>>>>
= GET viewProfile =
===============================================>>>>>*/
  function viewProfile(req,res) {
    let userId = req.params.userId;

    User.findById(userId, (err, user) =>{
      if(err) return res.status(500).send({message: `Ha ocurrido un error: ${err}`});

      if(!user) return res.status(404).send({message:'no se encontro el usuario'});

        res.status(200).send({user: user});
    })
  }

/*=============================================>>>>>
= POST recoverPassword =
===============================================>>>>>*/
  function recoverPassword (req, res) {
    let email = req.body.email;
    User.findOne({email: email}, (err, user) => {
      if(err) return res.status(500).send({mesagge: `Ha ocurrido un error ${err}`});

      if(!user) return res.status(404).send({message: 'No se encontro el email'});

      user.resetPasswordToken = service.createResetToken(user);
      user.resetPasswordExpires = Date.now() + 3600000;

      /* enviando correo */
      smtpTransport.sendMail(mailOptions(user, email, user.resetPasswordToken), (err, mail) =>{
        if(err) {
            res.status(500).send({message: `Ha ocurrido un error: ${err}`});
        }
            res.status(200).send({
              message: 'Se ha enviado un correo para recuperar su contraseña.',
              token: user.resetPasswordToken
          })
      });

    });
  }
/*=============================================>>>>>
= POST resetpassword =
===============================================>>>>>*/
  function resetPassword(req,res,next) {
    let userId = req.params.userId;
    let preUpdate = req.body.password;
    let update = service.encriptPassword(preUpdate);

    User.findById(userId,(err,user) =>{
      if(err) return res.status(500).send({message:`Ha ocurrido un error: ${err}`});
      if(!user) return res.status(404).send({message: 'no se encontro el usuario'})

      user.update({password: update}, (err) =>{
        if(err) return res.status(500).send({message:`Ha ocurrido un error: ${err}`});
        res.status(200).send({message: 'Tu nueva contraseña ha sido registrada con exito!'});
      });
    });
  }

/*=Export =*/
/*=============================================<<<<<*/

module.exports = {
  signIn,
  signUp,
  modifiedProfile,
  viewProfile,
  recoverPassword,
  resetPassword
}
