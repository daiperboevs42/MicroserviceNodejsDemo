import { connect } from "amqplib";

const messageQueueConnectionString = process.env.AMQP_URL || 'amqp://localhost';

// utility function to publish messages to a channel
const publishToChannel = async function publishToChannel( { routingKey, exchangeName, data }) {
    var channel = await openChannel();
    return new Promise((resolve, reject) => {
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data), 'utf-8'), { persistent: true }, function (err, ok) {
            if (err) {
                return reject(err);
            }

            resolve();
        })
    });
}

async function openChannel() {
    let connection = await connect(messageQueueConnectionString);
    let channel = await connection.createConfirmChannel();
    return channel;
 }


const listenForMessages = async function listenForMessages(consume) {
    // connect to Rabbit MQ
    let connection = await connect(messageQueueConnectionString);

    // create a channel and prefetch 1 message at a time
    let channel = await connection.createChannel();
    await channel.prefetch(1);

    // create a second channel to send back the results
    let resultsChannel = await connection.createConfirmChannel();

    // start consuming messages
    await consume({ connection, channel, resultsChannel });
}

export {listenForMessages, publishToChannel};