'use strict';

const amqp = require('amqplib');

// RabbitMQ connection string
const messageQueueConnectionString = process.env.AMQP_URL || 'amqp://localhost';

async function setup() {
    console.log("Setting up RabbitMQ Exchanges/Queues");
    // connect to RabbitMQ Instance
    let connection = await amqp.connect(messageQueueConnectionString);

    // create a channel
    let channel = await connection.createChannel();


    /// Order stuff
    await channel.assertExchange("books", "direct", { durable: true });

    // create queues
    await channel.assertQueue("books.requestBook", { durable: true });
    await channel.assertQueue("books.recieveBook", { durable: true });
    await channel.assertQueue("customers.requestCustomer", { durable: true });
    await channel.assertQueue("customers.recieveCustomer", { durable: true });

    // bind queues
    await channel.bindQueue("books.requestBook","books", "requestBook");
    await channel.bindQueue("books.recieveBook","books", "recieveBook");
    await channel.bindQueue("customers.requestCustomer","customers", "requestCustomer");
    await channel.bindQueue("customers.receiveCustomer","customers", "receiveCustomer");

    console.log("Setup Done");
    process.exit();
}

setup();