const express = require('express');
const cors = require('cors');
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


//Import models
const userModel = require("./app/models/userModel");
const diceHistoryModel = require("./app/models/diceHistoryModel");


//kết nối database 
mongoose.connect('mongodb://127.0.0.1:27017/GAMEDICE', {
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
const port = 8000;
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