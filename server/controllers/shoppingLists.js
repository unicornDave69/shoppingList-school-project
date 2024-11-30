const express = require("express");
const CreateAbl = require("../abl/createAbl");
const ListAbl = require("../abl/listAbl");
const GetByIdAbl = require("../abl/getAbl");
const UpdateByIdAbl = require("../abl/updateAbl");
const DeleteAbl = require("../abl/deleteAbl");
const authenticateJWT = require("../middleware/middleware");

const router = express.Router();

router.post("/create", authenticateJWT, CreateAbl);
router.get("/list", authenticateJWT, ListAbl);
router.get("/get/:id", authenticateJWT, GetByIdAbl);
router.put("/put/:id", authenticateJWT, UpdateByIdAbl);
router.delete("/delete", authenticateJWT, DeleteAbl);

module.exports = router;
