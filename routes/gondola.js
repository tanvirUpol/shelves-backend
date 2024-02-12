const express = require("express");
const router = express.Router();

const {
  createGondola,
  getAllGondola,
  getOneGondola,
  updateGondola,
  deleteGondola,
  getAllGondolaForID
} = require("../controllers/gondolaController");

router.get("/", getAllGondola);

router.get("/getAll", getAllGondolaForID);

router.get("/:id", getOneGondola);

router.post("/", createGondola);

router.post("/update/:id", updateGondola);

router.post("/delete/:id", deleteGondola);


module.exports = router