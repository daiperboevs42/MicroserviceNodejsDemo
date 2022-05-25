'use strict';
import { Order } from '../db/Order.js'

let getAllOrders =  async function(req, res) {
  const allOrders = await Order.find()
  if (err){
    res(err, null);
}else{
    res(null, allOrders);
}
};

let createOrder =  async function(req, res) {
  let orderData = req.body;
  //Cool stuff with messaging goes here
  const newOrder = await Order.create(orderData)
  console.log(newOrder)
  if (err){
    res(err, null);
}else{
    res(null, newOrder);
}
};

let getOrderWithID = async function(req, res){
  let orderID = req.body
  const foundOrder = await Order.findById(orderID)
  console.log(foundOrder)
  if (err){
    res(err, null);
}else{
    res(null, foundOrder);
}
}

export { getAllOrders , createOrder, getOrderWithID};