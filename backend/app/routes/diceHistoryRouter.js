const express = require('express');

//import module course controller 
const { getAllDiceHistory , getDiceHistoryById , createDiceHistory , updateDiceHistoryById , deleteDiceHistoryById} = require('../controllers/diceHistoryController')

const diceHistoryRouter = express.Router();

diceHistoryRouter.get("/dice-histories", getAllDiceHistory );
diceHistoryRouter.get("/dice-histories/:diceHistoryId", getDiceHistoryById );

diceHistoryRouter.post("/dice-histories", createDiceHistory );
diceHistoryRouter.put("/dice-histories/:diceHistoryId", updateDiceHistoryById );

diceHistoryRouter.delete("/dice-histories/:diceHistoryId", deleteDiceHistoryById );

module.exports= { diceHistoryRouter};