const express = require("express");
const CreateAbl = require("../abl/createAbl");
const ListAbl = require("../abl/listAbl");

const router = express.Router();

router.post("/create", CreateAbl);
router.get("/listAllRecords", ListAbl);

module.exports = router;
