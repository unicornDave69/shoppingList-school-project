const ShoppingList = require("../../model/ShoppingList");
const app = require("../../server");
const request = require("supertest");
const { describe, it, expect, beforeEach, afterAll } = require("@jest/globals");
const mongoose = require("mongoose");

describe("GET /api/lists/list", () => {
  jest.setTimeout(10000);

  beforeEach(async () => {
    await ShoppingList.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return every list", async () => {
    await ShoppingList.create({
      id: "34das178wq59fe20",
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    const res = await request(app).get("/api/lists/list");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Testing list");

    await ShoppingList.deleteMany({});
  });

  it("should return an empty list", async () => {
    const res = await request(app).get("/api/lists/list");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});
