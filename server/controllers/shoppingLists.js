const express = require("express");
const CreateAbl = require("../abl/createAbl");
const ListAbl = require("../abl/listAbl");
const GetByIdAbl = require("../abl/getAbl");
const UpdateByIdAbl = require("../abl/updateAbl");
const DeleteAbl = require("../abl/deleteAbl");

const router = express.Router();

router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.get("/get/:id", GetByIdAbl);
router.put("/put/:id", UpdateByIdAbl);
router.delete("/delete", DeleteAbl);

module.exports = router;
