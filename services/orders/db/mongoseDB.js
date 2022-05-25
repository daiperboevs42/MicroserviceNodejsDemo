'use strict';
import { mongoose }  from "mongoose"

mongoose.connect(
    "mongodb+srv://testUser:<testPassword>@microservicedemocluster.zto6bjx.mongodb.net/?retryWrites=true&w=majority",
    () => {
        console.log("Connected")
    },
    e => console.error(e)
)