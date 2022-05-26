'use strict';
import {  } from '../db/mongoseDB.js'
import { Order } from '../db/Order.js'

let getAllOrders =  async function(req, res) {
  const allOrders = await Order.find().catch(err =>{
    res(err, null);
});
    res(null, allOrders);
}

let createOrder =  async function(req, res) {
  let orderData = req.body;
  const newOrder = await Order.create(orderData).catch(err =>{
    res(err, null);
});
    console.log(newOrder)
    res(null, newOrder);
}

let getOrderWithID = async function(req, res){
  let orderID = req.param.id
  const foundOrder = await Order.findById(orderID).catch(err =>{
    res(err, null);
});
    console.log(foundOrder)
    res(null, foundOrder);
}

export { getAllOrders , createOrder, getOrderWithID};