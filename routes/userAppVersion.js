const express = require("express");
const router = express.Router();
const {
  createUserAppVersion,
  getAll,
  getOne,
} = require("../controllers/UserAppVersionController");

// Get all
router.get("/users", getAll);

router.get("/users/:id", getOne);

// Create
router.post("/users", createUserAppVersion); //create

module.exports = router;
