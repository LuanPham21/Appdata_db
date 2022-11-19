const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const model = initModel(sequelize);
const { Op } = require("sequelize");
const { successCode, errorCode, failCode } = require("../ulti/response");
const authController = require("./authController");

const getUser = async (req, res) => {
  const data = await model.user.findAll();

  res.send(data);
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let object = {
      username,
      password,
    };
    const checkUsername = await model.user.findAll({
      where: {
        username,
      },
    });

    if (checkUsername.length > 0) {
      errorCode(res, "Username đã tồn tại");
    } else {
      const data = await model.user.create(object);

      if (data) successCode(res, "Đăng kí thông tin người thành công");
      else errorCode(res, "Đăng kí thông tin người thất bại");
    }
  } catch {
    failCode(res);
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    let object = {
      name,
      email,
      phone,
      password: authController.hashPass(password),
      role_id: "HV",
    };

    const checkEmail = await model.user.findAll({
      where: {
        email: email,
      },
    });

    if (checkEmail.length > 0) {
      errorCode(res, "Email đã tồn tại");
    } else {
      const data = await model.user.create(object);

      if (data) successCode(res, "Đăng ký thành công");
      else errorCode(res, "Đăng ký thất bại");
    }
  } catch {
    failCode(res);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const pass_word = password;

  const checkUsername = await model.user.findOne({
    where: {
      username,
    },
  });

  if (checkUsername) {
    let { password } = checkUsername.dataValues;
    // let checkPassWord = authController.comparePass(pass_word, password);
    if (pass_word == password) {
      let token = "Đăng nhập thành công!";

      successCode(res, token);
    } else {
      errorCode(res, "Mật khẩu không đúng");
    }
  } else {
    errorCode(res, "Username không đúng");
  }
};

module.exports = {
  getUser,
  createUser,
  login,
};
