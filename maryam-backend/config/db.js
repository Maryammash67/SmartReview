const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // replace with your MySQL username
  database: "eca", // replace with your MySQL database name
  password: "", // replace with your MySQL password
  port: 3306, // MySQL default port is 3306
});

(async () => {
  try {
    const [rows, fields] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('Database connected:', rows[0].solution);
  } catch (error) {
    console.error('Database connection failed:', error.stack);
  }
})();

module.exports = pool;
