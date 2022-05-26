'use strict';

const amqp = require('amqplib');

// RabbitMQ connection string
const messageQueueConnectionString = process.env.AMQP_URL || 'amqps://rpjvuqrl:0d0c1RUA6Xxu7KViPcv4EPkdVZsMKYnk@rattlesnake.rmq.cloudamqp.com/rpjvuqrl';

async function setup() {
    console.log("Setting up RabbitMQ Exchanges/Queues");
    // connect to RabbitMQ Instance
    let connection = await amqp.connect(messageQueueConnectionString);

    // create a channel
    let channel = await connection.createChannel();


    /// Order stuff
    await channel.assertExchange("books", "direct", { durable: true });
    await channel.assertExchange("customers", "direct", { durable: true });

    // create queues
    await channel.assertQueue("books.requestCache", { durable: true });
    await channel.assertQueue("books.cacheList", { durable: true });
    await channel.assertQueue("customers.requestCache", { durable: true });
    await channel.assertQueue("customers.cacheList", { durable: true });

    // bind queues
    await channel.bindQueue("books.requestCache","books", "requestCache");
    await channel.bindQueue("books.cacheList","books", "cacheList");
    await channel.bindQueue("customers.requestCache","customers", "requestCache");
    await channel.bindQueue("customers.cacheList","customers", "cacheList");

    console.log("Setup Done");
    process.exit();
}

setup();