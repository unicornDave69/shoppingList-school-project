const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
app.use(cors());

const ShoppingListController = require("./controllers/shoppingLists");
const AuthController = require("./abl/auth/regLog-userAbl");

const app = express();

app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/WTBBTW/shoppinglists";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

//app.use("/auth", AuthController);

app.use("/", ShoppingListController);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
