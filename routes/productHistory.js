const express = require("express");
const router = express.Router();

const {
    getHistory
  } = require("../controllers/productHistoryController");

// get  all products
router.get("/", getHistory);



module.exports = router;
