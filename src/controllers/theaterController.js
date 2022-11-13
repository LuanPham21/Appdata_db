const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const model = initModel(sequelize);
const { Op } = require("sequelize");
const { successCode, errorCode, failCode } = require("../ulti/response");
const authController = require("./authController");

const getCineplex = async (req, res) => {
  const data = await model.cineplex.findAll();
  res.send(data);
};

const getCinema = async (req, res) => {
  const { id } = req.params;
  const data = await model.cineplex.findAll({
    where: {
      id: id,
    },
    include: "cinemas",
  });
  res.send(data);
};

const getCinemaMovie = async (req, res) => {
  const { id } = req.params;
  const data = await model.cinema_movie.findAll({
    where: {
      movieId: id,
    },
    include: [
      {
        model: model.cinema,
        as: "cinema",
      },
      {
        model: model.movie,
        as: "movie",
      },
    ],
  });
  res.send(data);
};

const getCinemaplex = async (req, res) => {
  const { id } = req.params;
  const data = await model.cineplex.findAll({
    where: {
      movieId: id,
    },
    include: [
      {
        model: model.cinema,
        as: "cinema",
      },
      {
        model: model.movie,
        as: "movie",
      },
    ],
  });
  res.send(data);
};

module.exports = {
  getCineplex,
  getCinema,
  getCinemaMovie,
};
