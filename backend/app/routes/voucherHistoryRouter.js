const express = require('express');

//import module course controller 
const { getAllVoucherHistory , getVoucherHistoryById , createVoucherHistory , updateVoucherHistoryById , deleteVoucherHistoryById} = require('../controllers/voucherHistoryController')

const voucherHistoryRouter = express.Router();

voucherHistoryRouter.get("/", getAllVoucherHistory );
voucherHistoryRouter.get("/:voucherHistoryId", getVoucherHistoryById );

voucherHistoryRouter.post("/", createVoucherHistory );
voucherHistoryRouter.put("/:voucherHistoryId", updateVoucherHistoryById );

voucherHistoryRouter.delete("/:voucherHistoryId", deleteVoucherHistoryById );

module.exports= { voucherHistoryRouter};