'use strict';
import { createOrder as createOrderService, getAllOrders as getAllOrdersService, getOrderWithID as getOrderWithIDService} from '../service/order.service.js'

let getAllOrders = function(request, response) {
    getAllOrdersService(request, function(err, aListOfOrders) {
        if (err){
            response(err, null);
        }else{
            response(null, aListOfOrders);
        }
    });
};

let createOrder = function(req, res) {
    createOrderService(req, function(err, orderInfo) {
        if (err){
            res(err, null);
        }else{
            res(null, orderInfo);
        }
    });
};

let getOrderWithID = function(request, response) {
    getOrderWithIDService(request, function(err, foundOrder) {
        if (err){
            response(err, null);
        }else{
            response(null, foundOrder);
        }
    })
}

export { getAllOrders, createOrder, getOrderWithID};