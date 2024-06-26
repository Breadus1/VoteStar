const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config");
const companyRoutes = require("./routes/company");
const gameRoutes = require("./routes/game");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use(
  "/api/companies",
  (req, res, next) => {
    console.log("Company route accessed");
    next();
  },
  companyRoutes
);

app.use(
  "/api/games",
  (req, res, next) => {
    console.log("Game route accessed");
    next();
  },
  gameRoutes
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
