import { mongoose }  from "mongoose"
const orderSchema = new mongoose.Schema({
    customerID: {
       type: mongoose.SchemaTypes.ObjectId,
       require: true
     },
     bookID: {
       type: mongoose.SchemaTypes.ObjectId,
       require: true
     },
     initialDate: {
        type: Date,
        require: true
     },
     deliveryDate: {
        type: Date,
        require: false
     }
})

const Order = mongoose.model("orders", orderSchema);

export { Order }