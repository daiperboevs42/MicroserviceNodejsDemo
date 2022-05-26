import { listenForMessages, publishToChannel } from '../controller/rabbitMQ/rabbitMQHelper.js'
let bookList = []
let customerList = []

function checkBookList(bookID){
    console.log(bookList)
    if(bookList.some(e => e._id === bookID)){
        return e
    }
    /*bookList.forEach(element => {
        if(element._id === bookID) //element.id == bookID
            return element
    });*/
    return null;
}

function checkCustomerList(customerID){
    customerList.forEach(element => {
        if(element._id === customerID) //element.id == customerID
            return element
    });
    return null;
}

async function HandleGetBookList(data) {
    bookList = []
    for(var i in data){
    bookList.push([i, data [i]]);}
    //bookList.push(data)
}

async function HandleGetCustomer(data) {
    customerList = []
    for(var i in data)
    customerList.push([i, data [i]]);
    //customerList.push(data)
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