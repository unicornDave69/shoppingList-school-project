const ShoppingList = require("../model/ShoppingList");

async function UpdateByIdAbl(req, res) {
  try {
    const { id } = req.params;
    const updateListById = await ShoppingList.findByIdAndUpdate(id, req.body);
    if (!updateListById) {
      return res.status(404).json({ error: "Shopping list not found." });
    }
    const updatedShoppingList = await ShoppingList.findById(id);
    res.status(200).json(updatedShoppingList);
  } catch (error) {
    console.error("Error retrieving shopping list:", error.stack);
    res.status(500).json({ error: "Failed to retrieve shopping list." });
  }
}

module.exports = UpdateByIdAbl;
