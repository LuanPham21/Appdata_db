const express = require("express");
const userController = require("../../controllers/userController");

const userRouter = express.Router();

userRouter.get("/LayDanhSachNguoiDung", userController.getUser);
userRouter.post("/ThemNguoiDung", userController.createUser);

//api login
userRouter.post("/login", userController.login);
module.exports = userRouter;
