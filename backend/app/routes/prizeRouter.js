const express = require('express');
//import module course controller 
const { getAllPrize, getPrizeById, createPrize, updatePrizeById, deletePrizeById } = require('../controllers/prizeController')

const prizeRouter = express.Router();


prizeRouter.get("/", getAllPrize);
prizeRouter.get("/:prizeId", getPrizeById);

prizeRouter.post("/", createPrize);
prizeRouter.put("/:prizeId", updatePrizeById);

prizeRouter.delete("/:prizeId", deletePrizeById);

module.exports= { prizeRouter};