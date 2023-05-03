const express = require('express');
// const { courseMiddleware } = require('../middlewares/courseMiddleware');
//import module course controller 
const { getAllUser, getUserById, createUser, updateUserById, deleteUserById } = require('../controllers/userController')

const userRouter = express.Router();

// userRouter.use( courseMiddleware );


userRouter.get("/users", getAllUser);
userRouter.get("/users/:userId", getUserById);

userRouter.post("/users", createUser);
userRouter.put("/users/:userId", updateUserById);

userRouter.delete("/users/:userId", deleteUserById);

module.exports= { userRouter};