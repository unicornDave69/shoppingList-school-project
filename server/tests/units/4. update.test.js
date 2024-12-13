const ShoppingList = require("../../model/ShoppingList");
const app = require("../../server");
const request = require("supertest");
const {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  beforeEach,
} = require("@jest/globals");
const mongoose = require("mongoose");

describe("PUT /api/lists/put/:id", () => {
  jest.setTimeout(10000);

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/WTBBTW", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    }
  });

  beforeEach(async () => {
    await ShoppingList.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  });

  it("should update the list", async () => {
    const list = await ShoppingList.create({
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    console.log("Created list:", list);

    const res = await request(app)
      .put(`/api/lists/put/${list._id}`)
      .send({ name: "Updated List" });

    console.log("PUT response:", res.body);

    expect(res.statusCode).toBe(200);

    const updatedList = await ShoppingList.findById(list._id);
    console.log("Updated list in DB:", updatedList);
    expect(updatedList.name).toBe("Updated List");
  });

  it("if the list does not exist should return 404", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    console.log("Invalid ID for test:", invalidId);

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

    console.log("PUT response for invalid ID:", res.body);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Shopping list not found.");
  });
});

describe("GET /api/lists/get/:id", () => {
  jest.setTimeout(10000);

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/testdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB for GET tests");
    }
  });

  beforeEach(async () => {
    await ShoppingList.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB after GET tests");
  });

  it("should return list based on id", async () => {
    const list = await ShoppingList.create({
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    console.log("Created list for GET test:", list);

    const res = await request(app).get(`/api/lists/get/${list._id}`);

    console.log("GET response:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Testing list");
  });
});
