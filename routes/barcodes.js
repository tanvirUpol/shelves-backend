const express = require("express");
const router = express.Router();

const {
    getAllByBarcode,
    getAllByMaterial
} = require("../controllers/BarcodesController");



router.get("/barcode/:barcode", getAllByBarcode);
router.get("/material/:material", getAllByMaterial);


module.exports = router