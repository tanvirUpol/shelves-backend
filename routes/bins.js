const express = require("express");
const router = express.Router();

const {
  createBin,
  deleteBin,
  getAllBins,
  getOneBin,
  appendProducts,
  deleteProducts,
  getAllSpecificBins,
  updateBin,
  stayAlive,
  getAllBinsID
} = require("../controllers/binController");

router.get("/", getAllBins);

router.get("/getAll/ID", getAllBinsID);

router.get("/specific/:id", getAllSpecificBins);

router.post("/delete/:id", deleteBin);

router.get("/:id", getOneBin);

router.get("/alive/now", stayAlive);

router.post("/update/:id", updateBin);

router.post("/", createBin);

router.post("/addProducts", appendProducts);

router.post("/deleteProducts", deleteProducts);

module.exports = router;
