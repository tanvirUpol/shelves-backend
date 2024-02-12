const express = require("express");
const router = express.Router();

const {
  addPermission,
  createRole,
  deleteRole,
  getAllRoles,
  removePermission,
} = require("../controllers/roleController");

router.get("/", getAllRoles);

router.post("/", createRole);

router.delete("/:roleId", deleteRole);

router.patch("/:roleId/addPermission", addPermission);

router.patch("/:roleId/removePermission", removePermission);


module.exports = router
