const Module = require("../models/Module");

// Create a new module
exports.createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all modules
exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find({ isActive: true });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get module by ID
exports.getModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module || !module.isActive) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update module
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module || !module.isActive) {
      return res.status(404).json({ message: "Module not found" });
    }

    Object.assign(module, req.body);
    await module.save();
    res.json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete module (soft delete)
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module || !module.isActive) {
      return res.status(404).json({ message: "Module not found" });
    }

    module.isActive = false;
    await module.save();
    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
