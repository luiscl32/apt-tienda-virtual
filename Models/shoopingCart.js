
'use-strict'

module.exports = function cart(oldcart){

  this.items = oldcart.items || {};
  this.totalQty = oldcart.totalQty || 0;
  this.totalPrice = oldcart.totalPrice || 0;
/*=============================================>>>>>
= ADD =
===============================================>>>>>*/

  this.add = function(item,id){
    var storedItems = this.items[id];

    if(!storedItems) {
      storedItems = this.items[id] = {item: item, qty: 0, price: 0}
      storedItems.totalQty = 0;
    }

    storedItems.totalQty++;
    this.totalQty++;
    storedItems.price = storedItems.item.price * storedItems.qty;
    this.totalPrice += storedItems.item.price;
  }

/*=============================================>>>>>
= REMOVE =
===============================================>>>>>*/
  this.remove = function(item,id) {
    var storedItems = this.items[id];

    if(!storedItems) {
      storedItems = this.items[id] = {item: item, qty: 0, price: 0}
    }

    storedItems.totalQty--;
    storedItems.price = ( storedItems.item.price * storedItems );
    this.totalQty--;
    this.totalPrice -= storedItems.item.price;


    if(storedItems.totalQty === 0) {
      delete this.items[id];
    }
  }



/*=============================================>>>>>
= CREATE ARRAY =
===============================================>>>>>*/

  this.createArray = function (){
    var arr = [];
      for(var id in this.items){
        arr.push(this.items[id]);
      }
    return arr;
  }

}
