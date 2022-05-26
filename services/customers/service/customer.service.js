'use strict';
import {createCustomer as createCustomerRepository, getAllCustomers as getAllCustomersRepository,
        getCustomerWithID as getCustomerWithIDRepository, deleteCustomer as deleteCustomerRepository, findCustomerMessage as findCustomerMessageRepository} from '../repository/customer.repository.js'


let getAllCustomers = function(request, response) {
    getAllCustomersRepository(request, function(err, aListOfCustomers) {
        if (err){
            response(err, null);
        }else{
            response(null, aListOfCustomers);
        }
    });
};

let createCustomer = function(req, res) {
    createCustomerRepository(req, function(err, createdCustomer) {
        if (err){
            res(err, null);
        }else{
            res(null, createdCustomer);
        }
    });
};

let getCustomerWithID = function(request, response) {
    getCustomerWithIDRepository(request, function(err, foundCustomer) {
        if (err){
            response(err, null);
        }else{
            response(null, foundCustomer);
        }
    })
}

let deleteCustomer = function(request, response) {
    deleteCustomerRepository(request, function(err, customerToDelete) {
        if (err){
            response(err, null);
        }else{
            response(null, customerToDelete);
        }
    })
}

let findCustomerMessage = function() {
    return findCustomerMessageRepository() 
}

export {getAllCustomers, createCustomer, getCustomerWithID, deleteCustomer, findCustomerMessage};