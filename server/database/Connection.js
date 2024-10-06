const mysql = require("mysql2");

const db = mysql.createConnection({
    // user: "root",
    // host: "172.17.0.2",
    // password: "root",
    // database: "group_music",

    // if we are using docker compose
    user: process.env.MYSQL_USER || "root",
    host: process.env.MYSQL_HOST || "localhost",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "group_music",
});

module.exports = db