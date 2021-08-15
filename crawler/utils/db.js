const mysql = require("mysql"); 

// 連線到mysql
const connection = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    port: process.env.DB_port,
    password: process.env.DB_password,
    database: process.env.DB_database,
});

module.exports = connection;