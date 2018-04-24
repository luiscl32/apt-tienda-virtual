'use-strict'

import service from '../Services';

  function IsAuth(req,res,next){


    if(!req.headers.authorization){
      return res.status(403).send({message: 'No tienes autorizacion'});
    }
    let authToken = req.headers.authorization.split(" ")[1];


    service.decodeToken(authToken)
      .then(res => {
        req.user = res;
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      })
  }

module.exports = IsAuth;
