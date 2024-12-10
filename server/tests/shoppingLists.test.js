const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const ShoppingList = require("../model/ShoppingList");

beforeAll(async () => {
  const MONGO_URI = "mongodb://localhost:27017/testDB";
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
