const ShoppingList = require("../model/ShoppingList");

async function DeleteAbl(req, res) {
  try {
    const { id } = req.body;
    const deletetedlist = await ShoppingList.findByIdAndDelete(id);
    res.status(201).json(deletetedlist);
    if (!deletetedlist) {
      return res.status(404).json({ error: "Shopping list not found." });
    }
  } catch (error) {
    console.error("Error deleting shopping list:", error.message);
  }
}

module.exports = DeleteAbl;
