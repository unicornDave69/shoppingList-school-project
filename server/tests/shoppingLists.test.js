const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const ShoppingList = require("../model/ShoppingList");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");

beforeAll(async () => {
  const MONGO_URI = "mongodb://localhost:27017/WTBBTW";
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Shopping List API", () => {
  it("Dummy test", () => {
    expect(true).toBe(true);
  });
});
