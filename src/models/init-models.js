const DataTypes = require("sequelize").DataTypes;
const _user = require("./user");

function initModels(sequelize) {
  const user = _user(sequelize, DataTypes);


  return {
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
