require('dotenv').config();

module.exports= {
    db_host:process.env.DB_HOST,
    db_database:process.env.DB_DATABASE,
    db_user:process.env.DB_USER,
    db_password:process.env.DB_PASSWORD,
    db_dialect:process.env.DB_DIALECT,
    db_port:process.env.DB_PORT
}