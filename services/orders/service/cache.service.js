import { listenForMessages, publishToChannel } from '../controller/rabbitMQ/rabbitMQHelper.js'
let bookList = []
let customerList = []

async function checkBookList(bookID){
    await bookList.forEach(element => {
        if(element._id === bookID){
            return element;
        } 
    });
    return null;
}

async function checkCustomerList(customerID){
    await customerList.forEach(element => {
        if(element._id === customerID){
            return element;
        }
    });
    return null;
}

async function HandleGetBookList(data) {
    bookList = []
    bookList = data;
}

async function HandleGetCustomer(data) {
    customerList = []
    customerList = data;
}

// consume messages from RabbitMQ
const consume = function consume({ connection, channel, resultsChannel }) {
    return new Promise((resolve, reject) => {
        channel.consume("customers.cacheList", async function (msg){
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
  
            // process data
            HandleGetCustomer(data);
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        })
        channel.consume("books.cacheList", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
  
            // process data
            HandleGetBookList(data);
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        });
    });
  }

listenForMessages(consume);

function requestCaches(){
    publishToChannel( { routingKey: "requestCache", exchangeName: "books", data: "1"});
    publishToChannel( { routingKey: "requestCache", exchangeName: "customers", data: "1"});
}
requestCaches();

export { checkBookList, checkCustomerList};