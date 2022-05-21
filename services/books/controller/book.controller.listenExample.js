'use strict';
import { addPlayer as serviceAddPlayer, disconnectPlayer as serviceDisconnect, getAllPlayersOnline as getAllPlayers } from '../services/user.service.js'

import { listenForMessages } from './rabbitMQ/rabbitMQHelper.js'

async function HandleUserDisconnect(message) {
    serviceDisconnect(message, function(err, user) {
        if (err){
            res(err, null);
        }
    });
}

let getBookFromBookMicroservice = function(req, res) {
    publishToChannel( { routingKey: "getBook", exchangeName: "books", data: "1" });
};

async function HandleGetBook(message) {
 //Do something with book ID.
 
 // As an example we get book object


 //Send data back
 publishToChannel( { routingKey: "recieveBook", exchangeName: "books", data: {id: 1, bookName:"Warhammer"} });
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
  
        channel.consume("users.disconnected", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
  
            // process data
            HandleUserDisconnect(data);
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        });
  
        // handle connection closed
        connection.on("close", (err) => {
            return reject(err);
        });
  
        // handle errors
        connection.on("error", (err) => {
            return reject(err);
        });
    });
  }

listenForMessages(consume);


let getAllPlayersOnline = function() {
    return getAllPlayers();
};

export { getAllPlayersOnline};
