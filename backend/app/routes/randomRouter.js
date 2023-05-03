const express = require('express');
// const { courseMiddleware } = require('../middlewares/courseMiddleware');
//import module course controller 
const { getRandom} = require('../controllers/randomController')

const randomRouter = express.Router();

// userRouter.use( courseMiddleware );


randomRouter.get("/random-number", getRandom);

module.exports= { randomRouter};