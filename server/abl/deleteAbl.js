const ShoppingList = require("../model/ShoppingList");

async function DeleteAbl(req, res) {
  try {
    const { id } = req.params;
    const deletedList = await ShoppingList.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ error: "Shopping list not found." });
    }

    res.status(200).json({ message: "Shopping list deleted successfully." });
  } catch (error) {
    console.error("Error deleting shopping list:", error.message);

    res.status(500).json({ error: "Failed to delete shopping list." });
  }
}

module.exports = DeleteAbl;
