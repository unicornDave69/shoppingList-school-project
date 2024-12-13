const ShoppingList = require("../../model/ShoppingList");
const app = require("../../server");
const request = require("supertest");
const { describe, it, expect, beforeEach, afterAll } = require("@jest/globals");
const mongoose = require("mongoose");

describe("DELETE /api/lists/delete/:id", () => {
  beforeEach(async () => {
    await ShoppingList.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should delete the list", async () => {
    const list = await ShoppingList.create({
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    const res = await request(app).delete(`/api/lists/delete/${list._id}`);

    const deletedList = await ShoppingList.findById(list._id);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Shopping list deleted successfully.");
    expect(deletedList).toBeNull();
  });

  it("if the list does not exist should return 404", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/lists/delete/${invalidId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Shopping list not found.");
  });
});
