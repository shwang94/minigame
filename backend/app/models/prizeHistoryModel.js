const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const prizeHistorySchema = new Schema({
id: mongoose.Types.ObjectId,
username:{
    type: String,
    ref: "User",
    require: true,
},
prize:{
    type: String,
    ref: "Prize",
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
module.exports = mongoose.model("PrizeHistory ", prizeHistorySchema);
