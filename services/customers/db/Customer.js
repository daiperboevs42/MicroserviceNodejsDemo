import { mongoose }  from "mongoose"
const CustomerSchema = new mongoose.Schema({
    name: {
       type: String,
       require: true
    },
    age: {
       type: Number,
       require: true
    },
    address: {
      type: String,
      require: true
    }
})
const Customer = mongoose.model("customer", CustomerSchema);

export { Customer }