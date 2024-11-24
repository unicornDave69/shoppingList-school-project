const Joi = require("joi");
const ShoppingList = require("../model/ShoppingList");

const CreateAbl = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    owner: Joi.string().required(),
    memberList: Joi.array().items(Joi.string()),
    itemList: Joi.array().items(
      Joi.object({
        itemName: Joi.string().required(),
        quantity: Joi.number().required(),
        resolved: Joi.boolean(),
      })
    ),
    status: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ code: "validationError", message: error.details[0].message });
  }

  try {
    const createdList = await ShoppingList.create(req.body);
    res.status(201).json({ code: "success", list: createdList });
  } catch (err) {
    console.error("Error creating shopping list:", err.message);
    res.status(500).json({ code: "serverError", message: err.message });
  }
};

module.exports = CreateAbl;
