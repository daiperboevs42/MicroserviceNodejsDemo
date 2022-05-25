'use strict';
import { getBookWithID as getBookWithIDService } from '../service/book.service'
import { listenForMessages } from './rabbitMQ/rabbitMQHelper.js'

let getBookFromBookMicroservice = function(req, res) {
    publishToChannel( { routingKey: "getBook", exchangeName: "books", data: "1" });
};

async function HandleGetBook(bookID) {
    let data = getBookWithID(bookID)
 //Send data back
 publishToChannel( { routingKey: "recieveBook", exchangeName: "books", data: data });
}

// consume messages from RabbitMQ
const consume = function consume({ connection, channel, resultsChannel }) {
    return new Promise((resolve, reject) => {
        channel.consume("books.getBook", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
  
            // process data
            HandleGetBook(data);
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        });
    });
  }

listenForMessages(consume);