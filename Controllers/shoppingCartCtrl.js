

'use-strict'
import express from 'express';
import Cart from '../Models/shoopingCart.js';
import Product from '../Models/products';

/*=============================================>>>>>
= GET =
===============================================>>>>>*/
  function getShoppingCart (req,res) {
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    if(!cart) return res.status(500).send({message: 'no se encuentra el carrito'});

    res.status(200).send({cart: cart});
  }


/*=============================================>>>>>
= addToCart =
===============================================>>>>>*/
  function addToCart (req,res,next) {
    let productId = req.params.productId;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    Product.findById(productId, (err,product) =>{
      if(err) return res.status(500).send({message:`Ha ocurrido un error ${err}`});
      cart.add(product,product._id);
      req.session.cart = cart;
      res.status(200).send({cart: req.session.cart});
    });
  }

/*=============================================>>>>>
= DELETE =
===============================================>>>>>*/
  function removeToCart (req,res) {
    let productId = req.params.productId;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    Product.findById(productId, (err, product) => {
      if(err) return res.status(500).send({message:`Ha ocurrido un error: ${err}`});
      if(!product) return res.status(200).send({message: 'No se encuentra el producto'});

      cart.remove(product,product._id);
      req.session.cart = cart;
      res.status(200).send({cart: req.session.cart});
    })
  }

/*=============================================>>>>>
= destroy =
===============================================>>>>>*/

  function destroy(req,res){
    req.session.destroy(err =>{
      if(err) return res.status(500).send({message:`Ha ocurrido un error ${err}`});
  
      res.status(200).send({message: 'sesion destruida'});
    })
  }

module.exports = {
  destroy,
  getShoppingCart,
  addToCart,
  removeToCart
}
