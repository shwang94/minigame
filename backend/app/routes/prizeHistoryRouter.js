const express = require('express');

//import module course controller 
const { getAllPrizeHistory , getPrizeHistoryById , createPrizeHistory , updatePrizeHistoryById , deletePrizeHistoryById} = require('../controllers/prizeHistoryController')

const prizeHistoryRouter = express.Router();

prizeHistoryRouter.get("/prize-histories", getAllPrizeHistory );
prizeHistoryRouter.get("/prize-histories/:prizeHistoryId", getPrizeHistoryById );

prizeHistoryRouter.post("/prize-histories", createPrizeHistory );
prizeHistoryRouter.put("/prize-histories/:prizeHistoryId", updatePrizeHistoryById );

prizeHistoryRouter.delete("/prize-histories/:prizeHistoryId", deletePrizeHistoryById );

module.exports= { prizeHistoryRouter};