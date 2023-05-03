const express = require('express');
//import module course controller 
const { getAllPrize, getPrizeById, createPrize, updatePrizeById, deletePrizeById } = require('../controllers/prizeController')

const prizeRouter = express.Router();


prizeRouter.get("/prizes", getAllPrize);
prizeRouter.get("/prizes/:prizeId", getPrizeById);

prizeRouter.post("/prizes", createPrize);
prizeRouter.put("/prizes/:prizeId", updatePrizeById);

prizeRouter.delete("/prizes/:prizeId", deletePrizeById);

module.exports= { prizeRouter};