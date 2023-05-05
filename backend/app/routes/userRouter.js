const express = require('express');
// const { courseMiddleware } = require('../middlewares/courseMiddleware');
//import module course controller 
const { getAllUser, getUserById, createUser, updateUserById, deleteUserById } = require('../controllers/userController')

const userRouter = express.Router();

// userRouter.use( courseMiddleware );


userRouter.get("/", getAllUser);
userRouter.get("/:userId", getUserById);

userRouter.post("/", createUser);
userRouter.put("/:userId", updateUserById);

userRouter.delete("/:userId", deleteUserById);

module.exports= { userRouter};