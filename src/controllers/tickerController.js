const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const model = initModel(sequelize);
const { Op } = require("sequelize");
const { successCode, errorCode, failCode } = require("../ulti/response");
const authController = require("./authController");

const createTicker = async (req, res) => {
  //   try {
  const { userId, movieId } = req.body;
  const cinema_movie = await model.cinema_movie.findOne({
    where: {
      id: movieId,
    },
  });

  let object = {
    userId,
    movieId,
  };

  console.log(object);

  if (cinema_movie) {
    const data = await model.ticket.create(object);

    if (data) successCode(res, "Đặt vé thành công");
    else errorCode(res, "Đặt vé thất bại");
  } else {
    errorCode(res, "Lịch chiếu phim không tồn tại");
  }
  //   } catch {
  //     failCode(res);
  //   }
};

const ticketRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const showTime = await model.showtime.findOne({
      where: {
        id: id,
      },
    });

    if (showTime) {
      const cinema = await model.cinema.findOne({
        where: {
          id: showTime.id,
        },
      });
      const cineplex = await model.cineplex.findOne({
        where: {
          id: cinema.id,
        },
      });
      const cinema_movie = await model.cinema_movie.findOne({
        where: {
          id: cinema.id,
        },
      });
      const movie = await model.movie.findOne({
        where: {
          id: cinema_movie.id,
        },
      });

      const data = await model.showtime.findAll({
        where: {
          id: id,
        },
        include: [
          {
            model: model.seat,
            as: "seats",
          },
        ],
      });

      let object = {
        ShowTimeId: showTime.id,
        CineplexName: cineplex.name,
        Cinema: cinema.name,
        Address: cinema.address,
        MovieName: movie.name,
        Poster: movie.poster,
        StartTime: showTime.startTime,
        data: data,
      };
      res.send(object);
    } else {
      errorCode(res, "Lịch chiếu phim không tồn tại");
    }
  } catch {
    failCode(res);
  }
};

const createShowTime = async (req, res) => {
  try {
    const { startTime, cinemaId, price } = req.body;

    let object = {
      startTime,
      cinemaId,
    };

    const checkCinema = await model.cinema.findAll({
      where: {
        id: cinemaId,
      },
    });

    if (checkCinema.length > 0) {
      const data = await model.showtime.create(object);

      let seat = {
        name: "Ghế thường",
        status: 0,
        price: price,
        type: "Ghế thường",
        showtimeId: data.id,
      };

      if (data) {
        await model.seat.create(seat);
        successCode(res, "Tạo lịch chiếu thành công");
      } else errorCode(res, "Tạo lịch chiếu thất bại");
    } else {
      errorCode(res, "Lịch chiếu phim không tồn tại");
    }
  } catch {
    failCode(res);
  }
};

module.exports = {
  createTicker,
  ticketRoom,
  createShowTime,
};
