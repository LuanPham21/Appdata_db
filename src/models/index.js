const { Sequelize } = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize(config.db_database, config.db_user, config.db_password, {
    host: config.db_host,
    dialect: config.db_dialect,
    port: config.db_port
})


module.exports = sequelize;