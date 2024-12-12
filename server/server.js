const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// CORS konfigurace
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/WTBBTW";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectToMongoDB();

// Import controlleru
const ShoppingListController = require("./controllers/shoppingLists");
app.use("/api/lists", ShoppingListController);

if (process.env.NODE_ENV !== "test") {
  app.listen(8005, () => {
    console.log("Server is running on port 8005");
  });
}

module.exports = app;
