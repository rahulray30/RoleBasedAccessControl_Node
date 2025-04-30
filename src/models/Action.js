const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for name to ensure uniqueness
actionSchema.index({ name: 1 }, { unique: true });

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
