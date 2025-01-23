const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL Connection Error:", err.message);

    switch (err.code) {
      case "ECONNREFUSED":
        console.error(
          "Connection refused. Ensure the MySQL server is running."
        );
        break;
      case "ER_ACCESS_DENIED_ERROR":
        console.error("Access denied. Verify your username and password.");
        break;
      case "ER_BAD_DB_ERROR":
        console.error("Database does not exist. Create the database first.");
        break;
      default:
        console.error("Unexpected error occurred:", err);
    }
    return;
  }

  if (connection) {
    console.log("MySQL Connected Successfully");

    connection.release();
  }
});

module.exports = pool;
