import bodyParser from 'body-parser';
import session from 'express-session';
import config from '../Config'
import mongoose from 'mongoose';

const MongoDBStore = require('connect-mongo')(session);
mongoose.connect(config.db);

const store = new MongoDBStore({mongooseConnection: mongoose.connection});

module.exports = app => {
/* configurar json */
  app.set('json spaces',4);
  app.set('port', config.port);

/* configurar para que acepte json */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));

/* configurando la session */
  app.use(session({
    secret: config.SECRET_TOKEN,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 180 * 60 * 1000 }
  }))

}
