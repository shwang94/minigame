const express = require('express');

//import module course controller 
const { getAllDiceHistory , getDiceHistoryById , createDiceHistory , updateDiceHistoryById , deleteDiceHistoryById} = require('../controllers/diceHistoryController')

const diceHistoryRouter = express.Router();

diceHistoryRouter.get("/", getAllDiceHistory );
diceHistoryRouter.get("/:diceHistoryId", getDiceHistoryById );

diceHistoryRouter.post("/", createDiceHistory );
diceHistoryRouter.put("/:diceHistoryId", updateDiceHistoryById );

diceHistoryRouter.delete("/:diceHistoryId", deleteDiceHistoryById );

module.exports= { diceHistoryRouter};