const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const voucherHistorySchema = new Schema({
id: mongoose.Types.ObjectId,
username:{
    type: String,
    ref: "User",
    require: true,
},
voucher:{
    type: String,
    ref: "Voucher",
    require: true,
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
module.exports = mongoose.model("VoucherHistory ", voucherHistorySchema);
