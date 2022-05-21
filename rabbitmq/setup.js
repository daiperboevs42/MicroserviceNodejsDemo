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
    await channel.assertQueue("books.getBook", { durable: true });
    await channel.assertQueue("books.recieveBook", { durable: true });

    // bind queues
    await channel.bindQueue("books.getBook","books", "getBook");
    await channel.bindQueue("books.recieveBook","books", "recieveBook");

    console.log("Setup Done");
    process.exit();
}

setup();