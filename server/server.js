const express = require("express");
const mongoose = require("mongoose");

const ShoppingListController = require("./controllers/shoppingLists");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/WTBBTW")
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.use("/lists", ShoppingListController);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});
