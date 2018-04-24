import mongoose from 'mongoose';
import config from '../Config';

module.exports = app => {

  mongoose.connect(config.db, (err,res)=>{
    if(err) return console.log(`error al conectar con la DB ${err}`);

    app.listen(app.get('port'), ()=>{
      console.log(`conectado a http://localhost:${app.get('port')}`);
    });
  });
}
