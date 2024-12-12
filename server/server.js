const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// cors configuration
const corsOptions = {
  origin: "http://localhost:3000", // allow only front-end on localhost:3000
  methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods
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

// Call the async MongoDB connection function
connectToMongoDB();

// controller import
const ShoppingListController = require("./controllers/shoppingLists");
app.use("/api/lists", ShoppingListController);

app.listen(8000);

module.exports = app;
