'use-strict'

import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../Config';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
/*=============================================>>>>>
= createToken =
===============================================>>>>>*/


function createToken (user){
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14,'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN);
}


/*=============================================>>>>>
= decode token =
===============================================>>>>>*/

function decodeToken (token) {
  const decoded = new Promise((reject,resolve) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if(payload.exp < moment().unix()){
        reject({status: 401, message: 'Su token ha expirado'});
      }

      resolve(payload.sub);

    } catch (err) {
      reject({status: 500, message: `Ha ocurrido un error ${err}`})
    }
  });

  return decoded;
}
/*=============================================>>>>>
= create resetToken =
===============================================>>>>>*/
  function createResetToken(user){
    let payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(1,'hour').unix()
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
  }


/*=============================================>>>>>
= encriptar password =
===============================================>>>>>*/

  function encriptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt)
    return hash;
  }

/*=============================================>>>>>
= create order token =
===============================================>>>>>*/

  function createOrderToken() {
    var buf = crypto.randomBytes(20);
    return buf.toString('hex');
  }


module.exports = {createToken,decodeToken,createResetToken,encriptPassword};
