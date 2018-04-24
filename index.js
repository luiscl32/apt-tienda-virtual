
import express from 'express';
import consign from 'consign';

const app = express();

/* inicio de la api */
  consign()
  .include('./Lib/init.js')
  .then('Routes')
  .include('./Lib/boot.js')
  .into(app)
