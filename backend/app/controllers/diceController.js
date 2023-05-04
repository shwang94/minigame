// import model 
const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');
const voucherModel = require('../models/voucherModel');
const prizeModel = require('../models/prizeModel');

const diceHistoryModel = require('../models/diceHistoryModel');
const voucherHistoryModel = require('../models/voucherHistoryModel');
const prizeHistoryModel = require('../models/prizeHistoryModel');

const get3CurrentDice = async (req, res) => {
    try {
        let allDiceHistories = null;
        let top3DiceHistories = {top1:[], top3:[]};
        let usernamex = req.params.username.trim();
        allDiceHistories = await diceHistoryModel.find({ "username": usernamex }).sort({ createdAt: "desc" }).exec();
        top3DiceHistories.top1.push(allDiceHistories[0]);
        top3DiceHistories.top3.push(allDiceHistories[0]);
        top3DiceHistories.top3.push(allDiceHistories[1]);
        top3DiceHistories.top3.push(allDiceHistories[2]);
        
        return res.json(top3DiceHistories);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
}
const getDice = async (req, res) => {
    let body = req.body;
    let userObj = null;
    let newDiceHistory = null;
    let newVoucherHistory = null;
    let newPrizeHistory = null
    let top3DiceHistories = null;
    var resData = { "voucher": null, "discount": 0, "dice": 0, "prize": null };

    try {
        userObj = await userModel.findOne({ "username": body.username }).exec();
        let diceHistory = new diceHistoryModel();
        diceHistory._id = new mongoose.Types.ObjectId();
        diceHistory.username = userObj.username;
        diceHistory.dice = Math.floor(6 * Math.random()) + 1;
        diceHistory.createdAt = Date.now();
        diceHistory.updatedAt = Date.now();

        newDiceHistory = await diceHistory.save();


        resData.dice = newDiceHistory.dice

        if (diceHistory.dice > 3) {

            //lấy tất cả vouchers từ mongdb lên
            let vouchers = await voucherModel.find();  //lấy tất cả vouchers hiện có trong db

            let randomIndex = randomInt(0, vouchers.length - 1); //lấy ngẫu nhiên 1 voucher theo index (giá trị randomIndex sẽ từ  0 --> length-1)
            resData.voucher = vouchers[randomIndex].code;
            resData.discount = vouchers[randomIndex].discount;
            //tạo voucherHistory
            let voucherObj = vouchers[randomIndex];
            let voucherHistory = new voucherHistoryModel();
            voucherHistory._id = new mongoose.Types.ObjectId();
            voucherHistory.username = userObj.username;
            voucherHistory.voucher = voucherObj.code;

            newVoucherHistory = voucherHistory.save();

            //lấy tất cả historydice của user từ mongdb lên
            top3DiceHistories = await diceHistoryModel.find({ "username": userObj.username }).sort({ createdAt: "desc" }).exec();

            // console.table(top3DiceHistories);
            if (top3DiceHistories[0].dice > 3 && top3DiceHistories[1].dice > 3 && top3DiceHistories[2].dice > 3) {
                //         //lấy tất cả prize từ mongdb lên
                let prizes = await prizeModel.find();  //lấy tất cả prizes hiện có trong db

                let randomIndexp = randomInt(0, prizes.length - 1); //lấy ngẫu nhiên 1 prize theo index (giá trị randomIndexp sẽ từ  0 --> length-1)
                resData.prize = prizes[randomIndexp].name;

                //         //tạo prizeHistory
                let prizeObj = prizes[randomIndexp];

                let prizeHistory = new prizeHistoryModel();
                prizeHistory._id = new mongoose.Types.ObjectId();
                prizeHistory.username = userObj.username;
                prizeHistory.prize = prizeObj.name;

                newPrizeHistory = await prizeHistory.save();
            }


        }
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Lỗi không thể lấy thông tin người dùng."
        });
    }

    return res.json(resData
    );
};


const getNewDice = async (req, res) => {
    let body = req.body;
    let usernamex = req.body.username.trim();
    let userId = (await userModel.findOne({ username: usernamex }))._id;
    if (userId == null) {
        res.status(500).json({
            message: `Lỗi không thể lấy dữ liệu`
        });
    }
    else {
        res.status(200).json({
            data
        });
    }


}

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//lấy dice history
const getDiceHistory = async (req, res) => {
    try {
        let resDiceHis = { dices: [] };
        let usernamex = req.params.username.trim();
        let allDiceHistoriesUser = await diceHistoryModel.find({ username: usernamex }).exec();

        for (var i = 0; i < allDiceHistoriesUser.length; i++) {
            resDiceHis.dices.push(allDiceHistoriesUser[i].dice);
        }

        return res.json(resDiceHis);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
};



const getPrizeHistory = async (req, res) => {
    try {
        let resPrizeHis = { prizes: [] }
        let usernamex = req.params.username.trim();
        let allPrizeHistoriesUser = await prizeHistoryModel.find({ username: usernamex }).exec();

        for (var i = 0; i < allPrizeHistoriesUser.length; i++) {
            resPrizeHis.prizes.push(allPrizeHistoriesUser[i].prize);
        }

        return res.json(resPrizeHis);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
}

const getVoucherHistory = async (req, res) => {
    try {
        let resVoucherHis = { vouchers: [] }
        let usernamex = req.params.username.trim();
        let allVoucherHistoriesUser = await voucherHistoryModel.find({ username: usernamex }).exec();


        for (var i = 0; i < allVoucherHistoriesUser.length; i++) {
            resVoucherHis.vouchers.push(allVoucherHistoriesUser[i].voucher);
        }

        return res.json(resVoucherHis);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi không thể lấy dữ liệu: ${error.message}` });
    }
}

//export hàm thanh modeule 
module.exports = { getDice, get3CurrentDice, getNewDice, getDiceHistory, getPrizeHistory, getVoucherHistory }