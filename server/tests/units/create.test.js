const app = require("../../server");
const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");

describe("POST /api/lists/create", () => {
  jest.setTimeout(10000);

  it("should create a new list", async () => {
    const newlist = {
      id: "34das178wq59fe20",
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    };

    const res = await request(app).post("/api/lists/create").send(newlist); // Posílání dat
    expect(res.status).toBe(201);
    expect(res.body.list.name).toBe("Testing list");
  });

  it("if validations fail, should return 400", async () => {
    const invalidList = {
      id: "34das178wq59fe20",
      name: true, // Špatná hodnota pro název
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
