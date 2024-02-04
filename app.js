const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { swaggerServe, swaggerSetup } = require("./utils/swagger.config.js");
const app = express();

app.use("/api-docs", swaggerServe, swaggerSetup);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(require("./routes/pricingRoute"));

module.exports = app;
