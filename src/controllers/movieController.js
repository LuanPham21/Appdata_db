const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const model = initModel(sequelize);
const { Op } = require("sequelize");
const { successCode, errorCode, failCode } = require("../ulti/response");
const authController = require("./authController");

const getMovie = async (req, res) => {
  const data = await model.movie.findAll();

  res.send(data);
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkName = await model.movie.findOne({
      where: {
        id: id,
      },
    });
    if (checkName) res.status(200).send(checkName);
    else errorCode(res, "Không có thông tin cần tìm");
  } catch {
    failCode(res);
  }
};

const createMovie = async (req, res) => {
  try {
    const { name, startDate, time, evaluate, poster, trailer } = req.body;

    let object = {
      name,
      startDate,
      time,
      evaluate,
      poster,
      trailer,
    };

    const data = await model.movie.create(object);

    if (data) successCode(res, "Thêm phim thành công");
    else errorCode(res, "Thêm phim thất bại");
  } catch {
    failCode(res);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const { id } = req.params;

    let getData = await model.movie.findByPk(id);

    let object = { ...getData, poster: `/public/img/${filename}` };
    const upfile = await model.movie.update(object, {
      where: {
        id: id,
      },
    });

    if (upfile) successCode(res, "Thêm hình thành công");
    else errorCode(res, "Thêm hình thất bại");
  } catch {
    failCode(res);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { name, startDate, time, evaluate, poster, trailer } = req.body;

    let object = {
      name,
      startDate,
      time,
      evaluate,
      poster,
      trailer,
    };

    const checkMovie = await model.movie.findOne({
      where: {
        name: name,
      },
    });
    if (checkMovie) {
      const data = await model.movie.update(object, {
        where: {
          name: name,
        },
      });

      if (data) successCode(res, "Sửa thông tin phim thành công");
      else errorCode(res, "Sửa thông tin phim thất bại");
    } else {
      errorCode(res, "Phim không tồn tại");
    }
  } catch {
    failCode(res);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.body;
    const checkMovie = await model.movie.findOne({
      where: {
        id: id,
      },
    });

    if (checkMovie) {
      const data = await model.movie.destroy({
        where: {
          id: id,
        },
      });

      if (data) successCode(res, "Xoá phim thành công");
      else errorCode(res, "Xoá phim thất bại");
    } else {
      errorCode(res, "Phim không tồn tại");
    }
  } catch {
    failCode(res);
  }
};

module.exports = {
  getMovie,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadImage,
};
