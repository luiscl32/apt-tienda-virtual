'use-strict'

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = Schema({
  cart: {type: Object, require: true},
  creditCard: {type: Number, Default: 0, require: true},
  cvc:      {type: Number, default: 0, require: true},
  email:    {type: String, require: true},
  totalQty: {type: Number, default: 0},
  totalPrice: {type: Number, default: 0},
  orderCode: String
});

module.exports = mongoose.model('order',orderSchema);
