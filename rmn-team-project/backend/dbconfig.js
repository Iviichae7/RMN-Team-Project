//SQL Connection
require('dotenv').config({path: '.env'});
const mysql = require('mysql2');

//Database connection information secured in env file
const connection = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});

//Connecting to the database & error handling
connection.connect((err) => {

    if (err) {
        console.log("Error connecting to database", err.stack);
        return;
    }
    console.log("Connected to database successfully as ID", connection.threadId);

});

//Connection is made available as export to other files
module.exports = connection;