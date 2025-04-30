const Permission = require("../models/Permission");
const Module = require("../models/Module");
const Action = require("../models/Action");

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const {
      name,
      description,
      module: moduleId,
      actions,
      isActive = true,
      metadata = {},
    } = req.body;

    // Check if module exists
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Check if all actions exist
    const actionIds = await Action.find({ _id: { $in: actions } });
    if (actionIds.length !== actions.length) {
      return res.status(404).json({ message: "One or more actions not found" });
    }

    const permission = new Permission({
      name,
      description,
      module: moduleId,
      actions,
      isActive,
      metadata,
    });

    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "Permission with this module and actions already exists",
        });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find()
      .populate("module", "name")
      .populate("actions", "name");
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get permission by ID
exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id)
      .populate("module", "name")
      .populate("actions", "name");
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get permissions by module ID
exports.getPermissionsByModule = async (req, res) => {
  try {
    const permissions = await Permission.find({ module: req.params.moduleId })
      .populate("module", "name")
      .populate("actions", "name");
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update permission
exports.updatePermission = async (req, res) => {
  try {
    const {
      name,
      description,
      module: moduleId,
      actions,
      isActive,
      metadata,
    } = req.body;

    // If module ID is provided, check if it exists
    if (moduleId) {
      const module = await Module.findById(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
    }

    // If actions are provided, check if they all exist
    if (actions) {
      const actionIds = await Action.find({ _id: { $in: actions } });
      if (actionIds.length !== actions.length) {
        return res
          .status(404)
          .json({ message: "One or more actions not found" });
      }
    }

    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // Update fields if provided
    if (name) permission.name = name;
    if (description) permission.description = description;
    if (moduleId) permission.module = moduleId;
    if (actions) permission.actions = actions;
    if (typeof isActive === "boolean") permission.isActive = isActive;
    if (metadata) permission.metadata = { ...permission.metadata, ...metadata };

    await permission.save();
    res.json(permission);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "Permission with this module and actions already exists",
        });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete permission
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permission.remove();
    res.json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
