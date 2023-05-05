const express = require('express');
//import module course controller 
const { getAllVoucher, getVoucherById, getDiscount, createVoucher, updateVoucherById, deleteVoucherById } = require('../controllers/voucherController')

const voucherRouter = express.Router();


voucherRouter.get("/", getAllVoucher);
voucherRouter.get("/:voucherId", getVoucherById);
voucherRouter.get("/discount/:code", getDiscount);

voucherRouter.post("/", createVoucher);
voucherRouter.put("/:voucherId", updateVoucherById);

voucherRouter.delete("/:voucherId", deleteVoucherById);

module.exports= { voucherRouter};