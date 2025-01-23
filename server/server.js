const express = require("express");
const dotenv = require("dotenv");
const MySQL = require("./config/database-sql");
const MongoDB = require("./config/database-mongodb");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

MongoDB();

app.listen(PORT, () => {
  console.log(`server live at port ${PORT}`);
});
