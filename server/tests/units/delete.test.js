describe("DELETE /api/lists/delete/:id", () => {
  it("should delete the list", async () => {
    const list = await ShoppingList.create({
      id: "34das178wq59fe20",
      name: "Testing list",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [],
      status: "active",
    });

    const res = await request(app).delete(`/api/lists/delete/${list._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Shopping list was deleted correctly.");
  });

  it("if the list does not exist should return 404 ", async () => {
    const invalidId = mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/lists/delete/${invalidId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Shopping list was not found.");
  });
});
