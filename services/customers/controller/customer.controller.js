'use strict';
import { createCustomer as createCustomerService, getAllCustomers as getAllCustomersService, 
         getCustomerWithID as getCustomerWithIDService, deleteCustomer as deleteCustomerService} from '../service/customer.service.js'

let getAllCustomers = function(request, response) {
    getAllCustomersService(request, function(err, aListOfCustomers) {
        if (err){
            response(err, null);
        }else{
            response(null, aListOfCustomers);
        }
    });
};

let createCustomer = function(req, res) {
    createCustomerService(req, function(err, customerInfo) {
        if (err){
            res(err, null);
        }else{
            res(null, customerInfo);
        }
    });
};

let getCustomerWithID = function(request, response) {
    getCustomerWithIDService(request, function(err, foundCustomer) {
        if (err){
            response(err, null);
        }else{
            response(null, foundCustomer);
        }
    })
}

let deleteCustomer = function(request, response) {
    deleteCustomerService(request, function(err, customerToDelete) {
        if (err){
            response(err, null);
        }else{
            response(null, customerToDelete);
        }
    })
}

export { getAllCustomers, createCustomer, getCustomerWithID, deleteCustomer};