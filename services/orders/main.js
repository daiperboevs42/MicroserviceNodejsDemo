import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import {createOrder ,getAllOrders, getOrderWithID} from './controller/order.controller.js'

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3003;

// Middleware
app.use(bodyParser.json());

app.get('/getAllOrders', function (req, res) {
    getAllOrders(change, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

app.post('/createOrder', function (req, res) {
    let newOrder = req.body;
    console.log(newOrder);
    createOrder(newOrder, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

app.get('/order/:id', (req, res) => {
    let bookID = req.body;
    getOrderWithID(bookID, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
})

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});

