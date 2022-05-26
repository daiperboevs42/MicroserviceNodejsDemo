'use strict';
import { createBook as createBookService, getAllBooks as getAllBooksService, 
         getBookWithID as getBookWithIDService, deleteBook as deleteBookService, findBookMessage} from '../service/book.service.js'
         import { listenForMessages, publishToChannel } from './rabbitMQ/rabbitMQHelper.js'

let getAllBooks = function(req, res) {
    getAllBooksService(req, function(err, aListOfBooks) {
        if (err){
            res(err, null);
        }else{
            res(null, aListOfBooks);
        }
    });
};

let createBook = function(req, res) {
    createBookService(req, function(err, bookInfo) {
        if (err){
            res(err, null);
        }else{
            HandleGetBook()
            res(null, bookInfo);
        }
    });
};

let getBookWithID = function(req, res) {
    getBookWithIDService(req, function(err, foundBook) {
        if (err){
            res(err, null);
        }else{
            res(null, foundBook);
        }
    })
}

let deleteBook = function(req, res) {
    deleteBookService(req, function(err, bookToDelete) {
        if (err){
            res(err, null);
        }else{
            HandleGetBook()
            res(null, bookToDelete);
        }
    })
}

async function HandleGetBook() {
    let data = await findBookMessage();
    publishToChannel( { routingKey: "cacheList", exchangeName: "books", data: data });
}

// consume messages from RabbitMQ
const consume = function consume({ connection, channel, resultsChannel }) {
    return new Promise((resolve, reject) => {
        channel.consume("books.requestCache", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
  
            // process data
            HandleGetBook();
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        });
    });
  }

listenForMessages(consume);
HandleGetBook();

export { getAllBooks, createBook, getBookWithID, deleteBook};