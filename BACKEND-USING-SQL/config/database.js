// const {createPool}=require('mysql')
// require('dotenv').config()

// const pool=createPool({
//     host:process.env.DB_HOST,
//     port:process.env.DB_PORT,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.MYSQL_DB,
//     connectionLimit:10
// })

// module.exports=pool

const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

const pool = mysql.createConnection({
    port:process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

// Establish the connection
pool.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = pool;

