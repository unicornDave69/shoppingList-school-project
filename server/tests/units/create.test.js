const ShoppingList = require("../../model/ShoppingList");

describe("POST/api/lists/create", async () => {
  it("should create a new list", async () => {
    const newlist = {
      id: "34das178wq59fe20",
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    };

    const res = await request(app).post("/api/lists/create");
    expect(res.status).toBe(201);
    expect(res.body.list.name).toBe("newlist");
  });

  it("if validations fails, should return 400", async () => {
    const invalidList = {
      id: "34das178wq59fe20",
      name: true,
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
