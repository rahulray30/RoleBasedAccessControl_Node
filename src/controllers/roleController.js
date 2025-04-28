const Role = require("../models/Role");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isActive: true });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get role by ID
exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || !role.isActive) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || !role.isActive) {
      return res.status(404).json({ message: "Role not found" });
    }

    Object.assign(role, req.body);
    await role.save();
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete role (soft delete)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || !role.isActive) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.isActive = false;
    await role.save();
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
