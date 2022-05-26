'use strict';
import { createCustomer as createCustomerService, getAllCustomers as getAllCustomersService, 
         getCustomerWithID as getCustomerWithIDService, deleteCustomer as deleteCustomerService, findCustomerMessage} from '../service/customer.service.js'
         import { listenForMessages, publishToChannel } from './rabbitMQ/rabbitMQHelper.js'

let getAllCustomers = function(req, res) {
    getAllCustomersService(req, function(err, aListOfCustomers) {
        if (err){
            res(err, null);
        }else{
            res(null, aListOfCustomers);
        }
    });
};

let createCustomer = function(req, res) {
    createCustomerService(req, function(err, customerInfo) {
        if (err){
            res(err, null);
        }else{
            HandleGetCustomer() 
            res(null, customerInfo);
        }
    });
};

let getCustomerWithID = function(req, res) {
    getCustomerWithIDService(req, function(err, foundCustomer) {
        if (err){
            res(err, null);
        }else{
            res(null, foundCustomer);
        }
    })
}

let deleteCustomer = function(req, res) {
    deleteCustomerService(req, function(err, customerToDelete) {
        if (err){
            res(err, null);
        }else{
            HandleGetCustomer() 
            res(null, customerToDelete);
        }
    })
}

async function HandleGetCustomer() {
    let data = await findCustomerMessage();
     publishToChannel( { routingKey: "cacheList", exchangeName: "customers", data: data });
 }
 
 // consume messages from RabbitMQ
 const consume = function consume({ connection, channel, resultsChannel }) {
     return new Promise((resolve, reject) => {
         channel.consume("customers.requestCache", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);

             // process data
             HandleGetCustomer();
   
             // acknowledge message as processed successfully
             await channel.ack(msg);
         });
     });
   }
 listenForMessages(consume);
 HandleGetCustomer()

export { getAllCustomers, createCustomer, getCustomerWithID, deleteCustomer};