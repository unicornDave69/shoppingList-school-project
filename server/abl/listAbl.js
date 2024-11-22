async function ListAbl(req, res) {
  try {
    const getAlllists = await ShoppingList.find({});

    res.status(201).json(getAlllists);
  } catch (error) {
    console.error("Error creating shopping list:", error.message);
  }
}

module.exports = ListAbl;
