const express = require("express");
const CreateAbl = require("../abl/createAbl");
const ListAbl = require("../abl/listAbl");
const GetByIdAbl = require("../abl/getAbl");
const UpdateByIdAbl = require("../abl/updateAbl");
const DeleteAbl = require("../abl/deleteAbl");

const router = express.Router();

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.get("/get/:id", (req, res) => {
  GetByIdAbl(req, res);
});

router.put("/put/:id", (req, res) => {
  UpdateByIdAbl(req, res);
});

router.delete("/delete/:id", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
