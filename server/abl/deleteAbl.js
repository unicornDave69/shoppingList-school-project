const ShoppingList = require("../model/ShoppingList");

async function DeleteAbl(req, res) {
  try {
    const { id } = req.body;

    // Najdeme a smažeme seznam podle ID
    const deletedList = await ShoppingList.findByIdAndDelete(id);

    // Pokud seznam nebyl nalezen, vrátíme 404
    if (!deletedList) {
      return res.status(404).json({ error: "Shopping list not found." });
    }

    // Pokud byl seznam smazán, vrátíme úspěšnou odpověď
    res
      .status(200)
      .json({ message: "Shopping list deleted successfully.", deletedList });
  } catch (error) {
    console.error("Error deleting shopping list:", error.message);

    // Vrátíme odpověď s chybou
    res.status(500).json({ error: "Failed to delete shopping list." });
  }
}

module.exports = DeleteAbl;
