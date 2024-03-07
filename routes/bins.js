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
  getAllBinsID,
  getDataByArticleCode,
  checkBinExists,
  getDataByArticleCodeAndSite
} = require("../controllers/binController");

router.get("/", getAllBins);

router.get("/checkBin/:binID", checkBinExists);

router.get("/getAll/ID", getAllBinsID);

router.get("/specific/:id", getAllSpecificBins);

router.post("/delete/:id", deleteBin);

router.get("/:id", getOneBin);

router.get("/alive/now", stayAlive);


router.get("/product/:articleCode", getDataByArticleCode);
// new
router.get("/product/:articleCode/:dc", getDataByArticleCodeAndSite);

router.post("/update/:id", updateBin);

router.post("/", createBin);

router.post("/addProducts", appendProducts);

router.post("/deleteProducts", deleteProducts);

module.exports = router;
