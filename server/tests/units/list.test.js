const app = require("../../server");
const ShoppingList = require("../../model/ShoppingList");

describe("GET/api/lists/list", () => {
  jest.setTimeout(10000);
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
  });

  it("should return an empty list", async () => {
    await ShoppingList.deleteMany({});
    const res = await request(app).get("/api/lists/list");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});
