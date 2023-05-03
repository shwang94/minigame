// import model 
const { default: mongoose } = require('mongoose');

//get all
const getRandom = (req, res) => {
    var randomDice = Math.floor(6*Math.random())+1;
    return res.json({"number":randomDice});

}

//export hàm thanh modeule 
module.exports = { getRandom }