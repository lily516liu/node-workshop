const mysql = require('mysql');
require("dotenv").config();
const Promise = require("bluebird");

// 連線到mysql
let connection = mysql.createPool({
    host: process.env.DB_host,
    user: process.env.DB_user,
    port: process.env.DB_port,
    password: process.env.DB_password,
    database: process.env.DB_database,
    // 使用預設值或10
    connectionLimit : process.env.CONNECTION_LIMIT || 10 ,
});

connection = Promise.promisifyAll(connection);

module.exports = connection;