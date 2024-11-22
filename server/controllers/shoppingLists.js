const express = require("express");
const CreateAbl = require("../abl/createAbl");

const router = express.Router();

router.post("/create", CreateAbl);

module.exports = router;
