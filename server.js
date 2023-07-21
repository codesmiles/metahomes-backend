require("dotenv").config();
const express = require("express");
const srcApp = require("./src/api/app");
const app = express();

app.use(express.urlencoded({ extended: true }),express.json());
app.use(srcApp);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on localhost 4000");
});