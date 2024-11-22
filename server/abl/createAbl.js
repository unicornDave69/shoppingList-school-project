const ShoppingList = require("../model/ShoppingList");

async function CreateAbl(req, res) {
  try {
    const record = req.body;
    const createdRecord = await ShoppingList.create(record);

    res.status(201).json(createdRecord);
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
