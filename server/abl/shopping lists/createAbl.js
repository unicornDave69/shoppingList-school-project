const mongoose = require("mongoose");

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
});
