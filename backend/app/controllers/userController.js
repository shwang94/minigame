// import model 
const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');

//get all
const getAllUser = async (req, res) => {

    try {
        const data = await userModel.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
    
}

const getUser = async (req, res) => {
    let body = req.body
    const datausername = await userModel.findOne({username: body.username, data1});
    const datapassword = await userModel.findOne({username: body.username, data2});
    
    try {
        if (datausername !== null && datapassword !== null) {
            
            return res.status(200).json({data})
        }
        
    } catch (error) {
        return res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
    
}
//get by id
const getUserById = (req, res) => {
    let id = req.params.userId; //B1 thu thập
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        userModel.findById(id, (error, data) => {
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


const createUser = async (req, res) => {
    let body = req.body;
    //B2 check data
    if (!body.username) {
        return res.status(400).json({
            message: "phải nhập username."
        })
    }
    if (!body.loginType) {
        return res.status(400).json({
            message: "phải nhập loginType."
        })
    }

    if (!body.uid) {
        return res.status(400).json({
            message: "phải nhập uid."
        })
    }

    if (!body.password) {
        return res.status(400).json({
            message: "phải nhập password."
        })
    }
    if (!body.avatar) {
        return res.status(400).json({
            message: "phải nhập avatar"
        })
    }
    var nusername = await userModel.findOne({ username: body.username });

    if (nusername !== null) {
        return res.status(401).json({
            message: "username đã tồn tại",
            data: nusername
        })
    }
    var nuid = await userModel.findOne({ uid: body.uid });

    if (nuid !== null) {
        return res.status(401).json({
            message: "uid đã tồn tại",
            data: nuid
        })
    }

    const user = new userModel({
        username: body.username,
        uid: body.uid,
        loginType: body.loginType,
        avatar: body.avatar,
        password: body.password,
    });

    try {
        await user.validate();
        const result = await user.save();
        return res.status(201).json(result);
    } catch (error) {

        return res.status(500).json({
            message: "lỗi:" + error
        })
    }
    
}

const updateUserById = (req, res) => {
    //B1 thu thập
    let id = req.params.userId;
    let body = req.body;
    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "id không tồn tại."
        })
    } else if (!body.username) {
        return res.status(400).json({
            message: "phải nhập username."
        })
    }
    else if (!body.firstname) {
        return res.status(400).json({
            message: "phải nhập firstname."
        })
    }
    else if (!body.lastname) {
        return res.status(400).json({
            message: "phải nhập lastname."
        })
    }
    else {
        //B3 trả về
        let user = {

            username: body.username,
            firstname: body.firstname,
            lastname: body.lastname
        }
        userModel.findByIdAndUpdate(id, user, { new: true }, (error, data) => {
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

const deleteUserById = (req, res) => {
    //B1
    let id = req.params.userId;

    //B2 check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "id không tồn tại"
        })
    } else {
        //B3
        userModel.findByIdAndDelete(id, (error, data) => {
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
module.exports = { getAllUser, getUserById, createUser, updateUserById, deleteUserById }