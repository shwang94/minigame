// import model 
const { default: mongoose } = require('mongoose');
const prizeHistoryModel = require('../models/prizeHistoryModel');

//get all
const getAllPrizeHistory = (req, res) => {
    prizeHistoryModel.find((error, data) => {
        if (error) {
            res.status(500).json({
                message: `Lỗi không thể lấy dữ liệu: ${error.message}`
            });
        } else {
            res.status(200).json({
                data
            });
        }
    })   
}
//get by id
const getPrizeHistoryById = (req, res) => {
    let id = req.params.prizeHistoryId; //B1 thu thập
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        prizeHistoryModel.findById(id, (error, data) => {
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

// post
const createPrizeHistory  = (req, res) => {
    let body = req.body; //B1 thu thập
    //B2 check data
    if (!body.username) {
        return res.status(400).json({
            message: "phải nhập username."
        })
    }
    if (!body.prize) {
        return res.status(400).json({
            message: "phải nhập prize."
        })
    }
    
    else {
        //B3 thực hiện thao tác
        let userId = req.body.username
        let prizeId = req.body.prizeId

        let prizeHistory = {
           
            username:userId,
            prize: prizeId       
        }

        //create new into mongodb
        prizeHistoryModel.create(prizeHistory, (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: `lỗi không thể tạo prizeHistory: ${error.message}`
                })
            } else {
                return res.status(201).json({
                    data
                })
            }
        });
    }


};

const updatePrizeHistoryById = (req, res) => {
    //B1 thu thập
    let id = req.params.prizeHistoryId;
    let body = req.body;
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "id không tồn tại."
        })
    } else if (!body.user) {
        return res.status(400).json({
            message: "phải nhập user."
        })
    }
    else if (!body.prize) {
        return res.status(400).json({
            message: "phải nhập prize."
        })
    } 
    
    else {
        //B3 trả về
        let prizeHistory = {
           
            user: body.user,
            prize: body.prize
                }        
                prizeHistoryModel.findByIdAndUpdate(id, prizeHistory, { new: true }, (error, data) => {
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

const deletePrizeHistoryById  = (req, res) => {
    //B1
    let id = req.params.prizeHistoryId;

    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        prizeHistoryModel.findByIdAndDelete(id, (error, data) => {
            if (error) {
                res.status(500).json({
                    message: `lỗi xóa không thành công: ${error.message}`
                })
            } else {
                res.status(204).json({
                    data: data
                })
            }
        })
    }
}
//export hàm thanh modeule 
module.exports = { getAllPrizeHistory, getPrizeHistoryById, createPrizeHistory, updatePrizeHistoryById, deletePrizeHistoryById }