const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static("."));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
    next();
});


app.listen(8080);

const rootRouter = require('./routers/index');

app.use("/api",rootRouter)
