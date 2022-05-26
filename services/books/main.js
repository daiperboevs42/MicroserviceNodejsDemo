import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import {createBook ,getAllBooks, getBookWithID, deleteBook} from './controller/book.controller.js'

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

app.get('/getAllBooks', function (req, res) {
    getAllBooks(req, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

app.post('/createBook', function (req, res) {
    let newBook = req.body;
    console.log(newBook);
    createBook(newBook, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
});

app.get('/book/:id', (req, res) => {
    let bookID = req.params.id;
    getBookWithID(bookID, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
})

app.delete('/book/:id', (req, res) => {
    let bookID = req.params.id;
    deleteBook(bookID, function(err, eventResult) {
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

