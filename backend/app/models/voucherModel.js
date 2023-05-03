const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const voucherSchema = new Schema({
id: mongoose.Types.ObjectId,
code:{
    type: String,
    unique: true,
    require: true,
},
discount:{
    type: Number,
    require: true
},
note:{
    type: String,
    require: false
},
createdAt:{
    type: Date,
    default: Date.now()
},
updatedAt:{
    type: Date,
    default: Date.now()
}
});
module.exports = mongoose.model("Voucher", voucherSchema);
