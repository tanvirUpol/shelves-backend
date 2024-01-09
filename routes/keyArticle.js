const express = require("express");
const router = express.Router();

const {
    createKeyArticles,
    getAllKeyArticles
  } = require("../controllers/keyArticleController");

// get  all products
router.get("/", getAllKeyArticles);

// upload products
router.post("/", createKeyArticles);

module.exports = router;
