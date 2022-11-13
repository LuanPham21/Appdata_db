const express = require("express");
const rootRouter = express.Router();

const userRouter = require("./v1/userRouter");

rootRouter.use("/user/v1", userRouter);

module.exports = rootRouter;
