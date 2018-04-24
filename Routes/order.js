'use-strict'

import orderCtrl from '../Controllers/orderCtrl';

module.exports = app => {
  app.get('/api/order/:orderId', orderCtrl.getOrder);
  app.post('/api/order', orderCtrl.createOrder);
  app.delete('/api/order/:orderId', orderCtrl.removeOrder);
}
