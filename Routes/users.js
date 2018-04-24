'user-strict'

import express from 'express';
import userCtrl from '../Controllers/authCtrl.js';
import auth from '../Middleware';

module.exports = app => {
  /* login */
    app.post('/api/signIn',userCtrl.signIn);
  /* registro */
    app.post('/api/signUp',userCtrl.signUp);
  /* ver perfil */
    app.get('/api/myProfile/:userId', userCtrl.viewProfile);
  /* Modificar perfil */
    app.put('/api/editProfile/:userId', auth, userCtrl.modifiedProfile);
  /* recuperar contraseña */
    app.post('/api/recoverPassword', userCtrl.recoverPassword);
  /* resetear la contraseña */
    app.put('/api/resetPassword/:token/:userId', auth,userCtrl.resetPassword);

}
