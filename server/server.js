const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// cors configuration
const corsOptions = {
  origin: "http://localhost:3000", //allow only front-end na localhost:3000
  methods: ["GET", "POST", "PUT", "DELETE"], // HTTP metods
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/WTBBTW";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// controller import
const ShoppingListController = require("./controllers/shoppingLists");
app.use("/api/lists", ShoppingListController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
