'use strict';
import {createOrder as createOrderRepository, getAllOrders as getAllOrdersRepository, getOrderWithID as getOrderWithIDRepository} from '../repository/order.repository.js'

let getAllOrders = function(request, response) {
    getAllOrdersRepository(request, function(err, aListOfOrders) {
        if (err){
            response(err, null);
        }else{
            response(null, aListOfOrders);
        }
    });
};

let createOrder = function(req, res) {
    createOrderRepository(req, function(err, createOrder) {
        if (err){
            res(err, null);
        }else{
            res(null, createOrder);
        }
    });
};

let getOrderWithID = function(request, response) {
    getOrderWithIDRepository(request, function(err, foundOrder) {
        if (err){
            response(err, null);
        }else{
            response(null, foundOrder);
        }
    })
}

export {getAllOrders, createOrder, getOrderWithID};