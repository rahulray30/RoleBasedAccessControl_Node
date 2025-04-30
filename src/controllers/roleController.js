const Role = require("../models/Role");
const Permission = require("../models/Permission");
const User = require("../models/User");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const {
      name,
      description,
      permissions,
      isActive = true,
      metadata = {},
    } = req.body;

    // Check if all permissions exist
    if (permissions && permissions.length > 0) {
      const permissionIds = await Permission.find({
        _id: { $in: permissions },
      });
      if (permissionIds.length !== permissions.length) {
        return res
          .status(404)
          .json({ message: "One or more permissions not found" });
      }
    }

    const role = new Role({
      name,
      description,
      permissions,
      isActive,
      metadata,
    });

    await role.save();
    res.status(201).json(role);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Role with this name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions", "name description");
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get role by ID
exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate(
      "permissions",
      "name description"
    );
    if (!role) {
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
    const { name, description, permissions, isActive, metadata } = req.body;

    // If permissions are provided, check if they all exist
    if (permissions && permissions.length > 0) {
      const permissionIds = await Permission.find({
        _id: { $in: permissions },
      });
      if (permissionIds.length !== permissions.length) {
        return res
          .status(404)
          .json({ message: "One or more permissions not found" });
      }
    }

    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Prevent updating the superadmin role's name
    if (
      role.name.toLowerCase() === "superadmin" &&
      name &&
      name.toLowerCase() !== "superadmin"
    ) {
      return res
        .status(403)
        .json({ message: "Cannot change the name of the superadmin role" });
    }

    // Update fields if provided
    if (name) role.name = name;
    if (description) role.description = description;
    if (permissions) role.permissions = permissions;
    if (typeof isActive === "boolean") role.isActive = isActive;
    if (metadata) role.metadata = { ...role.metadata, ...metadata };

    await role.save();
    res.json(role);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Role with this name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Prevent deleting the superadmin role
    if (role.name.toLowerCase() === "superadmin") {
      return res
        .status(403)
        .json({ message: "Cannot delete the superadmin role" });
    }

    // Check if any users are using this role
    const usersWithRole = await User.countDocuments({ role: role._id });
    if (usersWithRole > 0) {
      return res.status(400).json({
        message: "Cannot delete role that is assigned to users",
        usersCount: usersWithRole,
      });
    }

    await role.remove();
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
