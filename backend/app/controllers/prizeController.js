// import model 
const { default: mongoose } = require('mongoose');
const prizeModel = require('../models/prizeModel');

//get all
const getAllPrize = async (req, res) => {
    try {
        const data = await prizeModel.find();
        res.status(200).json({
            data
        });
    } catch (error) {
        res.status(500).json({
            message: `Lỗi không thể lấy dữ liệu: ${error.message}`
        });
    }
}

//get by id
const getPrizeById = (req, res) => {
    let id = req.params.prizeId; //B1 thu thập
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        prizeModel.findById(id, (error, data) => {
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
const createPrize = async (req, res) => {
    let body = req.body; //B1 thu thập
    //B2 check data
    if (!body.name) {
        return res.status(400).json({
            message: "phải nhập name."
        })
    } else {
        try {
            //B3 thực hiện thao tác
            let prize = {
                name: body.name,
                description: body.description
            }

            //create new into mongodb
            const data = await prizeModel.create(prize);
            return res.status(201).json({
                data
            });
        } catch (error) {
            return res.status(500).json({
                message: `lỗi không thể tạo Prize: ${error.message}`
            });
        }
    }
};


const updatePrizeById = (req, res) => {
    //B1 thu thập
    let id = req.params.prizeId;
    let body = req.body;
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "id không tồn tại."
        })
    } else if (!body.name) {
        return res.status(400).json({
            message: "phải nhập name."
        })
    }
    
    else {
        //B3 trả về
        let prize = {
           
            name: body.name,
            description: body.description
        }        
        prizeModel.findByIdAndUpdate(id, prize, { new: true }, (error, data) => {
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

const deletePrizeById  = (req, res) => {
    //B1
    let id = req.params.prizeId;

    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        prizeModel.findByIdAndDelete(id, (error, data) => {
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
module.exports = { getAllPrize, getPrizeById, createPrize, updatePrizeById, deletePrizeById }