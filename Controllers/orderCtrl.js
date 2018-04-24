'use-strict'
import Order from '../Models/order';
import Cart from '../Models/shoopingCart';
import service from '../Services';

/*=============================================>>>>>
= GET =
===============================================>>>>>*/
  function getOrder(req,res) {
    let orderId = req.params.orderId;

    Order.findById(orderId, (err,order) =>{
      if(err) return res.status(500).send({message: `Ha ocurrido un error ${err}`});
      if(!order) return res.status(404).send({message: 'No se ha encontrado la orden de compra'});
        res.status(200).send({order: order})
    });
  }
/*=============================================>>>>>
= POST =
===============================================>>>>>*/
  function createOrder(req,res) {

    console.log('aqui');
    let cart = new Cart(req.session.cart);

    let order = new Order();

    order.cart = cart.items,
    order.creditCard = req.body.creditCard,
    order.cvc = req.body.cvc,
    order.email = req.body.email,
    order.totalQty = cart.totalQty,
    order.totalPrice = cart.totalPrice,
    order.orderCode = service.createOrderToken();

    order.save((err,orderSaved) => {

      console.log(orderSaved);
      if(err) return res.status(500).send({message: `Ha ocurrido un error: ${err}`});
        res.status(200).send({order: orderSaved});
    })
  }

/*=============================================>>>>>
= DELETE =
===============================================>>>>>*/
  function removeOrder(req, res) {
    let orderId = req.params.orderId;

    Order.findById(orderId, (err,order) =>{
      if(err) return res.status(500).send({message: `Ha ocurrido un error: ${err}`});
      if(!order) return res.status(404).send({message: 'No se encuentra la orden de compra'})

        order.remove(err => {
          if(err) return res.status(500).send({message: `Ha ocurrido un error  al eliminar: ${err}`});
            res.status(200).send({message: 'La orden se ha cancelado con exito'});
        });
    })
  }


module.exports = {
  getOrder,
  createOrder,
  removeOrder
}
