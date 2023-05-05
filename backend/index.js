const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dotenv = require('dotenv');
//Import router

const { diceRouter } = require("./app/routes/diceRouter");

const { userRouter } = require("./app/routes/userRouter");
const { prizeRouter } = require("./app/routes/prizeRouter");
const { voucherRouter } = require("./app/routes/voucherRouter");

const { diceHistoryRouter } = require("./app/routes/diceHistoryRouter");
const { voucherHistoryRouter } = require("./app/routes/voucherHistoryRouter");
const { prizeHistoryRouter } = require("./app/routes/prizeHistoryRouter");


const mongoose = require('mongoose');// khai báo thư viện database 
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./index.js'], // Add the path to the file(s) containing your API documentation
};
const swaggerConfig = require('./swagger.config');
//swaggerAutogen(swaggerConfig.outputFile, swaggerConfig.endpointsFiles, swaggerConfig);





dotenv.config({
  path: './.env'
});

//Import models
const userModel = require("./app/models/userModel");
const diceHistoryModel = require("./app/models/diceHistoryModel");


//kết nối database 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connected successfully');
})
.catch((error) => {
  console.log('Database connection failed:', error);
});


const app = express();
const port = process.env.PORT;
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require(swaggerConfig.outputFile)));
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());
app.options("*",cors());

app.use("/gamedice", diceRouter);

app.use("/users", userRouter);
app.use("/prizes", prizeRouter);
app.use("/vouchers", voucherRouter);
app.use("/dice-histories", diceHistoryRouter);
app.use("/voucher-histories", voucherHistoryRouter);
app.use("/prize-histories", prizeHistoryRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})