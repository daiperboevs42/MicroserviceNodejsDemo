'use strict';
import { createOrder as createOrderService, getAllOrders as getAllOrdersService, getOrderWithID as getOrderWithIDService} from '../service/order.service.js'
import { checkBookList, checkCustomerList} from '../service/cache.service.js'

let getAllOrders = function(req, res) {
    getAllOrdersService(req, function(err, aListOfOrders) {
        if (err){
            res(err, null);
        }else{
            res(null, aListOfOrders);
        }
    });
};
//FIX THIS 
let createOrder = function(req, res) {
    let bookID = req.params.bookid;
    let customerID = req.params.customerid;
    if(checkBookList(bookID) != null && checkCustomerList(customerID) != null){
        createOrderService(req, function(err, req) {
            if (err){
                res(err, null);
            }else{
                res(null, req);
            }
        });
    }
    else{
        console.log("It no worky")
        return "Failed to confirm book or customer ID"
    }
};

let getOrderWithID = function(req, res) {
    let orderID = req.param.id;
    getOrderWithIDService(orderID, function(err, foundOrder) {
        if (err){
            res(err, null);
        }else{
            res(null, foundOrder);
        }
    })
}

export { getAllOrders, createOrder, getOrderWithID};