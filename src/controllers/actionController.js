const Action = require("../models/Action");

// Create a new action
exports.createAction = async (req, res) => {
  try {
    const { name, description, isActive = true, metadata = {} } = req.body;
    
    console.log("inside action-----");
    
    const action = new Action({
      name,
      description,
      isActive,
      metadata,
    });


    await action.save();
    res.status(201).json(action);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Action with this name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get all actions
exports.getActions = async (req, res) => {
  try {
    const actions = await Action.find();
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get action by ID
exports.getAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }
    res.json(action);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update action
exports.updateAction = async (req, res) => {
  try {
    const { name, description, isActive, metadata } = req.body;

    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }

    // Update fields if provided
    if (name) action.name = name;
    if (description) action.description = description;
    if (typeof isActive === "boolean") action.isActive = isActive;
    if (metadata) action.metadata = { ...action.metadata, ...metadata };

    await action.save();
    res.json(action);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Action with this name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete action
exports.deleteAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }

    await action.remove();
    res.json({ message: "Action deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
