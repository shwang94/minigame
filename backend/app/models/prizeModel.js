const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const prizeSchema = new Schema({
id: mongoose.Types.ObjectId,
name:{
    type: String,
    unique: true,
    require: true,
},
description:{
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
module.exports = mongoose.model("Prize", prizeSchema);
