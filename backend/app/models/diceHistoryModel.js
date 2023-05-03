const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diceHistorySchema = new Schema({
id: mongoose.Types.ObjectId,
username:{
    type: String,
    ref: "User",
    require: true,
},
dice:{
    type: Number,
    require: true
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
module.exports = mongoose.model("DiceHistory ", diceHistorySchema);
