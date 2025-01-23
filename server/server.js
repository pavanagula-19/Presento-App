const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`server live at port ${PORT}`);
});
