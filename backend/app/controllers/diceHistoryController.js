// import model 
const { default: mongoose } = require('mongoose');
const diceHistoryModel = require('../models/diceHistoryModel');
const userModel = require('../models/userModel');

//get all
const getAllDiceHistory = (req, res) => {
    diceHistoryModel.find((error, data) => {
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
const getDiceHistoryById = async (req, res) => {
    let id = req.params.diceHistoryId; //B1 thu thập
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        });
    } else {
        //B3
        try {
            const data = await diceHistoryModel.findById(id);
            if (!data) {
                res.status(404).json({
                    message: "Không tìm thấy kết quả."
                });
            } else {
                res.status(200).json({
                    data
                });
            }
        } catch (error) {
            res.status(500).json({
                message: `lỗi không thể lấy dữ liệu: ${error.message}`
            });
        }
    }
};


// post
const createDiceHistory  = (req, res) => {
    let body = req.body; //B1 thu thập

    

    //B2 check data
    if (!body.username) {
        return res.status(400).json({
            message: "phải nhập user."
        })
    }
    if (!body.dice) {
        return res.status(400).json({
            message: "phải nhập dice."
        })
    }
    if (!Number.isInteger(body.dice) || body.dice < 0 || body.dice > 7) {
        return res.status(400).json({
            message: "dice phải là số lớn hơn 0, nhỏ hơn hoặc bằng 6"
        })
    }
    
    else {
    //     //B3 thực hiện thao tác
    let userId = userModel.findOne({username: body.username})._id

    let diceHistory= {
        _id : new mongoose.Types.ObjectId(),
        username : body.username,
        dice : body.dice,
        createdAt : Date.now(),
        updatedAt : Date.now()
    }

    //     //create new into mongodb
    
    
        diceHistoryModel.create(diceHistory)
            .then(data => {
                return res.status(201).json({ data });
            })
            .catch(error => {
                return res.status(500).json({ message: `lỗi không thể tạo Dice: ${error.message}` });
            });
    
}
}





const updateDiceHistoryById  = (req, res) => {
    //B1 thu thập
    let id = req.params.diceHistoryId;
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
    else if (!body.dice) {
        return res.status(400).json({
            message: "phải nhập dice."
        })
    } 
    
    else {
        //B3 trả về
        let dicehistory = {
           
            user: body.user,
            dice: body.dice
        }
        diceHistoryModel.findByIdAndUpdate(id, dicehistory, { new: true }, (error, data) => {
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

const deleteDiceHistoryById   = (req, res) => {
    //B1
    let id = req.params.diceHistoryId;

    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        diceHistoryModel.findByIdAndDelete(id, (error, data) => {
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
module.exports = { getAllDiceHistory , getDiceHistoryById , createDiceHistory , updateDiceHistoryById , deleteDiceHistoryById }