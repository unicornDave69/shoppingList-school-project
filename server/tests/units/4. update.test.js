const ShoppingList = require("../../model/ShoppingList");
const app = require("../../server");
const request = require("supertest");
const { describe, it, expect, afterAll } = require("@jest/globals");
const mongoose = require("mongoose");

describe("PUT /api/lists/put/:id", () => {
  jest.setTimeout(10000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should update the list", async () => {
    const list = await ShoppingList.create({
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    const res = await request(app)
      .put(`/api/lists/put/${list._id}`)
      .send({ name: "Updated List" });

    const updatedList = await ShoppingList.findById(list._id);

    expect(res.statusCode).toBe(200);
    expect(updatedList.name).toBe("Updated List");
  });

  it("if the list does not exist should return 404", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/lists/put/${invalidId}`)
      .send({
        id: "34das178wq59fe20",
        name: "Updated list",
        owner: true,
        memberList: ["u2", "u3"],
        itemList: [],
        status: "active",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Shopping list not found.");
  });
});