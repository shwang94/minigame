// import model 
const { default: mongoose } = require('mongoose');
const voucherModel = require('../models/voucherModel');

//get all
const getAllVoucher = async (req, res) => {
    try {
      const data = await voucherModel.find().exec(); // sử dụng await để đợi cho tới khi promise trả về kết quả
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
  };
  
//get by id
const getVoucherById = (req, res) => {
    let id = req.params.voucherId; //B1 thu thập
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        voucherModel.findById(id, (error, data) => {
            if (error) {
                res.status(500).json({
                    message: `lỗi không thể lấy dữ liệu: ${error.message}`
                });
            } else {
                res.status(200).json({
                    data
                });
            }
        })
    }
}

const getDiscount = async (req, res) => {
    try {
      const code = req.params.code; // B1 thu thập
      // B2 check
      // B3
      const data = await voucherModel.findOne({code: code}).exec(); // sử dụng await để đợi cho tới khi promise trả về kết quả
      res.status(200).json(data.discount);
    } catch (error) {
      res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
  };
  


// post
const createVoucher = async (req, res) => {
    try {
        let body = req.body; //B1 thu thập
        //B2 check data
        if (!body.code) {
            return res.status(400).json({
                message: "phải nhập code."
            })
        }
        if (!body.discount) {
            return res.status(400).json({
                message: "phải nhập discount."
            })
        } else {
            //B3 thực hiện thao tác
            let voucher = {
                code: body.code,
                discount: body.discount,
                note: body.note
            }

            //create new into mongodb
            const data = await voucherModel.create(voucher);
            return res.status(201).json({
                data
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `lỗi không thể tạo Voucher: ${error.message}`
        });
    }
};


const updateVoucherById = (req, res) => {
    //B1 thu thập
    let id = req.params.voucherId;
    let body = req.body;
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "id không tồn tại."
        })
    } else if (!body.code) {
        return res.status(400).json({
            message: "phải nhập code."
        })
    }
    else if (!body.discount) {
        return res.status(400).json({
            message: "phải nhập discount."
        })
    }  
    else {
        //B3 trả về
        let voucher = {
           
            code: body.code,
            discount: body.discount,
            note: body.note
        }
        voucherModel.findByIdAndUpdate(id, voucher, { new: true }, (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: `lỗi cập nhập không thành công: ${error.message}`
                })
            } else {
                // console.log("đã cập nhập dữ liệu thành công" + data);
                return res.status(200).json(data)
            }
        });
    }
};

const deleteVoucherById  = (req, res) => {
    //B1
    let id = req.params.voucherId;

    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        voucherModel.findByIdAndDelete(id, (error, data) => {
            if (error) {
                res.status(500).json({
                    message: `lỗi xóa không thành công: ${error.message}`
                })
            } else {
                res.status(204).json({
                    data: data.reviews
                })
            }
        })
    }
}
//export hàm thanh modeule 
module.exports = { getAllVoucher, getVoucherById, getDiscount, createVoucher, updateVoucherById, deleteVoucherById }