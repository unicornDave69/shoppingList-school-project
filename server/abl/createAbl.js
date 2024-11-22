const ShoppingList = require("../model/ShoppingList");

async function CreateAbl(req, res) {
  try {
    const list = req.body;
    const createdlist = await ShoppingList.create(list);

    res.status(201).json(createdlist);
  } catch (error) {
    console.error("Error creating shopping list:", error.message);

    if (error.name === "ValidationError") {
      res.status(400).json({
        code: "validationError",
        message: "Validation failed.",
        validationError: error.errors,
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CreateAbl;
