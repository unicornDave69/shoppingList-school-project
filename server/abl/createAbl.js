const mongoose = require("mongoose");

// Definice schématu
const ShoppingListSchema = mongoose.Schema({
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
    type: [Object],
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

// Model
const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);

module.exports = ShoppingList;
