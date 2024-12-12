const app = require("../../server");
const request = require("supertest");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const mongoose = require("mongoose");

// Připojení k testovací databázi
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost:27017/shopping-list-test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Uzavření připojení po testech
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("POST /api/lists/create", () => {
  jest.setTimeout(10000);

  it("should create a new list", async () => {
    const newlist = {
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    };

    const res = await request(app).post("/api/lists/create").send(newlist);
    expect(res.status).toBe(201);
    expect(res.body.list.name).toBe("Testing list");
  });

  it("if validations fail, should return 400", async () => {
    const invalidList = {
      name: true, // Nesprávný typ
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    };

    const res = await request(app).post("/api/lists/create").send(invalidList);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("validationError");
  });
});
