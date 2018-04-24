
'use-strict'


import cartCtrl from '../Controllers/shoppingCartCtrl';
import auth from '../Middleware';


module.exports = app => {
  app.get('/api/cart', auth ,cartCtrl.getShoppingCart);
  app.get('/api/addCart/:productId', auth ,cartCtrl.addToCart);
  app.get('/api/removeCart/:productId', auth ,cartCtrl.removeToCart);
  app.get('/api/destroy', cartCtrl.destroy)
}
