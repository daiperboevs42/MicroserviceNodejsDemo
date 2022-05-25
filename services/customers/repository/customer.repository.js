'use strict';
import { Customer } from '../db/Customer.js'

let getAllCustomers =  async function(req, res) {
  const allCustomers = await Customer.find()
  if (err){
    res(err, null);
}else{
    res(null, allCustomers);
}
};

let createCustomer =  async function(req, res) {
  let customerData = req.body;
  const newCustomer = await Book.create(customerData)
  console.log(newCustomer)
  if (err){
    res(err, null);
}else{
    res(null, newCustomer);
}
};

let getCustomerWithID = async function(req, res){
  let customerID = req.body
  const foundCustomer = await Book.findById(customerID)
  console.log(foundCustomer)
  if (err){
    res(err, null);
}else{
    res(null, foundCustomer);
}
}

let deleteCustomer = async function(req, res){
  let customerID = req.body
  const deletedCustomer = await Book.deleteOne({_id: customerID})
  if (err){
    res(err, null);
}else{
    res(null, deletedCustomer);
}
}

export { getAllCustomers , createCustomer, getCustomerWithID, deleteCustomer};