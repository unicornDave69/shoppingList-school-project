const { default: mongoose } = require("mongoose");
const ShoppingList = require("../../model/ShoppingList");
const app = require("../../server");
const request = require("supertest");
const describe = require("supertest");
const it = require("supertest");
const expect = require("supertest");

describe("GET/api/lists/get/:id", () => {
  jest.setTimeout(10000);
  it("should return list based on id", async () => {
    const list = await ShoppingList.create({
      id: "34das178wq59fe20",
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    const res = await request(app).get(`/api/lists/get.${list._id}`);
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("Testing list");
  });

  it("should return 404 if the shopping list was not found or exits", async () => {
    const invalidId = mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/lists/get.${list._id}`);
    expect(res.status).toBe(200);
    expect(res.body.error).toBe("Shopping list not found.");
  });
});
