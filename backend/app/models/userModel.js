const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
id: mongoose.Types.ObjectId,
username:{
    type: String,  
    required: true,
    unique: true
},

uid:{
    type: String,    
    required: true,
    unique: true,
    
},

loginType:{
    type: String,
    required: true,
},

avatar:{
    type: String,
    required: false,
    default:""
},

password:{
    type: String,
    required: true,
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
module.exports = mongoose.model("User", userSchema);
