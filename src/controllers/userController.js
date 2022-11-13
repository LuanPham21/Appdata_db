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

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const checkName = await model.user.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (checkName) res.status(200).send(checkName);
    else errorCode(res, "Không có thông tin cần tìm");
  } catch {
    failCode(res);
  }
};

const getInforUser = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await model.user.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmail) res.status(200).send(checkEmail);
    else errorCode(res, "Không có thông tin cần tìm");
  } catch {
    failCode(res);
  }
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

      if (data) successCode(res, "Tạo thông tin người thành công");
      else errorCode(res, "Tạo thông tin người thất bại");
    }
  } catch {
    failCode(res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, phone, password, role_id } = req.body;

    let object = {
      name,
      email,
      phone,
      password: authController.hashPass(password),
      role_id: role_id,
    };
    const checkEmail = await model.user.findAll({
      where: {
        email: email,
      },
    });

    if (checkEmail.length > 0) {
      const data = await model.user.update(object, {
        where: {
          email: email,
        },
      });

      if (data) successCode(res, "Sửa thông tin người thành công");
      else errorCode(res, "Sửa thông tin người thất bại");
    } else {
      errorCode(res, "Email không tồn tại");
    }
  } catch {
    failCode(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await model.user.findAll({
      where: {
        email: email,
      },
    });

    if (checkEmail.length > 0) {
      const data = await model.user.destroy({
        where: {
          email: email,
        },
      });

      if (data) successCode(res, "Xoá user thành công");
      else errorCode(res, "Xoá user thất bại");
    } else {
      errorCode(res, "Email không tồn tại");
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
  getUserByName,
  getInforUser,
  createUser,
  updateUser,
  deleteUser,
  signUp,
  login,
};
