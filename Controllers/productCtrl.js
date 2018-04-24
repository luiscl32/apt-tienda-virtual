'use-strict'

import Product from '../Models/products.js'

/*=============================================>>>>>
= GET products =
===============================================>>>>>*/

  function getProducts(req,res){
    Product.find({}, (err, product) => {
      /* verificando errores */
      if(err) return res.status(500).send({message:`Error al obtener los productos ${err}`});
      if(!product) return res.status(404).send('No se ha encontrado los productos');
      /* mostrando productos */
      res.status(200).send({product});
    });
  }

  function getProductId(req,res){
    let productId = req.params.productId;

    Product.findById(productId, (err,product) =>{
      if(err) return res.status(500).send({message:`Error al cargar los productos ${err}`});
      if(!product) return res.status(404).send('No se ha encontrado el producto solicitado.');
      /* mostrando el producto */
      res.status(200).send({product})
    });
  }

/*=============================================>>>>>
= POST Product =
===============================================>>>>>*/

  function createProducts(req,res){
    let product = new Product();
    /* agregando valores */
    product.name        = req.body.name;
    product.price       = req.body.price;
    product.description = req.body.description;
    product.category    = req.body.category;
    product.brand       = req.body.brand;
    product.reputation  = req.body.reputation;
    product.vendor      = req.body.vendor;
    product.picture     = req.body.picture;

    /* guardando el producto */
    product.save((err, productStored) =>{
      if(err) return res.status(500).send({message:`Ha ocurrido un error al guardar el producto ${err}`});
      /* producto guardado */
        res.status(200).send({product: productStored});
    });
  }

/*=============================================>>>>>
= PUT product =
===============================================>>>>>*/

  function updateProducts(req,res){
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update ,(err,productUpdate) =>{
      if(err) return res.status(500).send({message:`Ha ocurrido un error al intentar actualizar el producto ${err}`});
      /* actualizar producto */
        res.status(200).send({product: productUpdate});
    })
  }

/*=============================================>>>>>
= DELETE Product =
===============================================>>>>>*/

  function removeProducts(req,res){
    let productId = req.params.productId;

    Product.findById(productId, (err,product) =>{
      if(err) return res.status(500).send({message:`Ha ocurrido un error al encontrar el producto ${err}`});

      product.remove( err => {
        if(err) return res.status(500).send({message:`Ha ocurrido un error al eliminar el producto ${err}`});
        /* eliminando producto */
          res.status(200).send({message:'El producto ha sido removido correctamente'});
      })
    })
  }


/*= End =*/
/*=============================================<<<<<*/
  module.exports ={
    getProducts,
    getProductId,
    createProducts,
    updateProducts,
    removeProducts
  }
