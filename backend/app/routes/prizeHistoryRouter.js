const express = require('express');

//import module course controller 
const { getAllPrizeHistory , getPrizeHistoryById , createPrizeHistory , updatePrizeHistoryById , deletePrizeHistoryById} = require('../controllers/prizeHistoryController')

const prizeHistoryRouter = express.Router();

prizeHistoryRouter.get("/", getAllPrizeHistory );
prizeHistoryRouter.get("/:prizeHistoryId", getPrizeHistoryById );

prizeHistoryRouter.post("/", createPrizeHistory );
prizeHistoryRouter.put("/:prizeHistoryId", updatePrizeHistoryById );

prizeHistoryRouter.delete("/:prizeHistoryId", deletePrizeHistoryById );

module.exports= { prizeHistoryRouter};