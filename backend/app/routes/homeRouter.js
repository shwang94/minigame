const express = require('express');
const path = require('path');//khai báo thư viện path
const { timeMiddleware } = require('../middlewares/timeMiddleware');
// const { requestMiddleware } = require('../middlewares/requestMiddleware');
const homeRouter = express.Router();

homeRouter.use( timeMiddleware );
// homeRouter.use( requestMiddleware );
homeRouter.use(express.static('views'));



homeRouter.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname + '../../../views/LuckyDice.html'));
})

// homeRouter.get('/', (req, res) => {
    
//     res.status(200).end();
// })

module.exports= { homeRouter};
