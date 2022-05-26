'use strict';
import {  } from '../db/mongoseDB.js'
import { Customer } from '../db/Customer.js'


let getAllCustomers =  async function(req, res) {
  const allCustomers = await Customer.find().catch(err =>{
    res(err, null);
});
    res(null, allCustomers);
}

let createCustomer =  async function(req, res) {
  const newCustomer = await Customer.create(req).catch(err =>{
    res(err, null);
});
    res(null, newCustomer);
}

let getCustomerWithID = async function(req, res){
  const foundCustomer = await Customer.findById(req).catch(err =>{
    res(err, null);
  });
    res(null, foundCustomer);
}

let deleteCustomer = async function(req, res){
  const deletedCustomer = await Customer.deleteOne({_id: req}).catch(err =>{
    res(err, null);
});
    res(null, deletedCustomer);
}

let findCustomerMessage = async function(){
  const foundCustomer = await Customer.find();
  return foundCustomer;
}

export { getAllCustomers , createCustomer, getCustomerWithID, deleteCustomer, findCustomerMessage};