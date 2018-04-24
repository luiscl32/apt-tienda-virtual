'use-strict'

import express from 'express';
import productCtrl from '../Controllers/productCtrl.js';
import auth from '../Middleware';

module.exports = app => {
  /* GET */
    app.get('/api/products',productCtrl.getProducts);
    app.get('/api/products/:productId',productCtrl.getProductId);
  /* POST */
    app.post('/api/products',productCtrl.createProducts);
  /* PUT */
    app.put('/api/products/:productId',productCtrl.updateProducts);
  /* DELETE */
    app.delete('/api/products/:productId',productCtrl.removeProducts);
}
