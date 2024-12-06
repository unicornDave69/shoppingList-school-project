const mongoose = require("mongoose");

const ShoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  memberList: {
    type: [String],
    required: false,
  },
  itemList: {
    type: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        resolved: { type: Boolean, default: false },
      },
    ],
    required: false,
  },
  status: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
