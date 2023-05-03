const express = require('express');

//import module course controller 
const { getAllVoucherHistory , getVoucherHistoryById , createVoucherHistory , updateVoucherHistoryById , deleteVoucherHistoryById} = require('../controllers/voucherHistoryController')

const voucherHistoryRouter = express.Router();

voucherHistoryRouter.get("/voucher-histories", getAllVoucherHistory );
voucherHistoryRouter.get("/voucher-histories/:voucherHistoryId", getVoucherHistoryById );

voucherHistoryRouter.post("/voucher-histories", createVoucherHistory );
voucherHistoryRouter.put("/voucher-histories/:voucherHistoryId", updateVoucherHistoryById );

voucherHistoryRouter.delete("/voucher-histories/:voucherHistoryId", deleteVoucherHistoryById );

module.exports= { voucherHistoryRouter};