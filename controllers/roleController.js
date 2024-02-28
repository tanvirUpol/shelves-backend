const Role = require("../models/RolesModel");

// get all
const getAllRoles = async (req, res) => {
    // console.log("wewe");
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a role
const createRole = async (req, res) => {
  const { role, hasPermission } = req.body;

  try {
    const newRoles = await Role.create({ role, hasPermission });
    res.status(201).json({ message: "Role created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add permission
const addPermission = async (req, res) => {
  const { roleId } = req.params;
  const { permission } = req.body;

  console.log(permission);

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.hasPermission.push(permission);

    const updatedRole = await role.save();

    res.json({ message: "Permission added successfully" });
  } catch (err) {
    console.log({ message: err.message });
    res.status(400).json({ message: err.message });
  }
};

// remove permission
const removePermission = async (req, res) => {
  const { roleId } = req.params;
  const { permission } = req.body;

  console.log(permission);

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.hasPermission = role.hasPermission.filter((p) => p !== permission);

    const updatedRole = await role.save();

    res.json({ message: "Role removed successfully" });
  } catch (err) {
    console.log({ message: err.message });
    res.status(400).json({ message: err.message });
  }
};

// delete a role
// const deleteRole = async (req, res) => {
//   const { roleId } = req.params;

//   try {
//     const deleteRole = await Role.findByIdAndDelete(roleId);

//     if (!deleteRole) {
//       return res.status(404).json({ message: "Role not found" });
//     }
//     res.json({ message: "Role deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// delete a role
const deleteRole = async (req, res) => {
  const { roleId } = req.params;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json({ message: "Role updated successfully", role: updatedRole });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
    getAllRoles,
    createRole,
    addPermission,
    removePermission,
    deleteRole
}