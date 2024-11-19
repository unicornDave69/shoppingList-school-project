const express = require("express");
const mongoose = require("mongoose");
const ShoppingList = require("./abl/createAbl");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/wtbbtw")
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.post("/list/create", async (req, res) => {
  try {
    const list = await ShoppingList.create(req.body);
    res.status(201).json(list);
  } catch (error) {
    console.error("Error creating shopping list:", error.message);
    res.status(500).json({ message: error.message });
  }
});
