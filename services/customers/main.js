import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import {createCustomer, getAllCustomers, getCustomerWithID, deleteCustomer} from './controller/customer.controller.js'
// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());

app.get('/getAllCustomers', function (req, res) {
    getAllCustomers(req, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

app.post('/createCustomer', function (req, res) {
    let newCustomer = req.body;
    console.log(newCustomer);
    createCustomer(newCustomer, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

app.get('/customer/:id', (req, res) => {
    let customerID = req.params.id;
    getCustomerWithID(customerID, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
})

app.delete('/customer/:id', (req, res) => {
    let customerID = req.params.id;
    deleteCustomer(customerID, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});

