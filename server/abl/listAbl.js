const ShoppingList = require("../model/ShoppingList");

async function ListAbl(req, res) {
  try {
    const getAlllists = await ShoppingList.find({});
    res.status(200).json(getAlllists);
  } catch (error) {
    console.error("Error retrieving shopping lists:", error.stack);
    res.status(500).json({ error: "Failed to retrieve shopping lists." });
  }
}

module.exports = ListAbl;
