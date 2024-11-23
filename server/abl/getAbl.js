const ShoppingList = require("../model/ShoppingList");

async function GetByIdAbl(req, res) {
  try {
    const { id } = req.params;
    const getListById = await ShoppingList.findById(id);
    if (!getListById) {
      return res.status(404).json({ error: "Shopping list not found." });
    }
    res.status(200).json(getListById);
  } catch (error) {
    console.error("Error retrieving shopping list:", error.stack);
    res.status(500).json({ error: "Failed to retrieve shopping list." });
  }
}

module.exports = GetByIdAbl;
