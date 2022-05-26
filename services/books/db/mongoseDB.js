'use strict';
import { mongoose }  from "mongoose"

const url = "mongodb+srv://testUser:testPassword@microservicedemocluster.zto6bjx.mongodb.net/MicroserviceDemo?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
     // const collection = client.db("MicroserviceDemo").collection("Books");
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

