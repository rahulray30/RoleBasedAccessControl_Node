const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    actions: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
        required: true,
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

// Create a compound index for module and actions to ensure uniqueness
permissionSchema.index({ module: 1, actions: 1 }, { unique: true });

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
