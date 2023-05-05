const express = require('express');
// const { courseMiddleware } = require('../middlewares/courseMiddleware');
//import module course controller 
const { getDice, get3CurrentDice, getDiceHistory, getPrizeHistory, getVoucherHistory } = require('../controllers/diceController')

const diceRouter = express.Router();

diceRouter.post("/dice", getDice);
diceRouter.get("/dice-history/:username", getDiceHistory);
diceRouter.get("/prize-history/:username", getPrizeHistory);
diceRouter.get("/voucher-history/:username", getVoucherHistory);
diceRouter.get("/dice/:username", get3CurrentDice)


module.exports= { diceRouter};