const mongoose = require("mongoose");
const ShoppingList = require("../model/ShoppingList");

async function DeleteAbl(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format." });
    }

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
