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
    status: Joi.string().valid("active", "archived"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ code: "validationError", message: error.details[0].message });
  }

  try {
    const { name, owner, memberList, itemList, status } = req.body;

    const createdList = await ShoppingList.create({
      name,
      owner,
      memberList,
      itemList,
      status,
    });

    res.status(201).json({ code: "success", list: createdList });
  } catch (err) {
    console.error("Error creating shopping list:", err.message);
    res.status(500).json({ code: "serverError", message: err.message });
  }
};

module.exports = CreateAbl;
