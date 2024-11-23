const ShoppingList = require("../model/ShoppingList");

async function GetByIdAbl(req, res) {
  try {
    const { id } = req.params;
    const getListById = await ShoppingList.findById({ id });
    res.status(200).json(getListById);
  } catch (error) {
    console.error("Error retrieving shopping lists:", error.stack);
    res.status(500).json({ error: "Failed to retrieve shopping lists." });
  }
}

module.exports = GetByIdAbl;
