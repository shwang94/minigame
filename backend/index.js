const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
//Import router
const { homeRouter } = require("./app/routes/homeRouter");
const { randomRouter } = require("./app/routes/randomRouter");
const { diceRouter } = require("./app/routes/diceRouter");

const { userRouter } = require("./app/routes/userRouter");
const { prizeRouter } = require("./app/routes/prizeRouter");
const { voucherRouter } = require("./app/routes/voucherRouter");

const { diceHistoryRouter } = require("./app/routes/diceHistoryRouter");
const { voucherHistoryRouter } = require("./app/routes/voucherHistoryRouter");
const { prizeHistoryRouter } = require("./app/routes/prizeHistoryRouter");


const mongoose = require('mongoose');// khai báo thư viện database 

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

app.use(express.json());
app.use(cors());
app.use("/", homeRouter);
app.use("/", randomRouter);
app.use("/gamedice", diceRouter);

app.use("/", userRouter);
app.use("/", prizeRouter);
app.use("/", voucherRouter);
app.use("/", diceHistoryRouter);
app.use("/", voucherHistoryRouter);
app.use("/", prizeHistoryRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})