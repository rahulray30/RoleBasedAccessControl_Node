const Role = require("../models/Role");
const User = require("../models/User");
const mongoose = require("mongoose");

const initializeSuperAdmin = async () => {
  try {
    // Check if superadmin role exists
    let superadminRole = await Role.findOne({ name: "superadmin" });

    if (!superadminRole) {
      // Create superadmin role if it doesn't exist
      superadminRole = await Role.create({
        name: "superadmin",
        description: "Super Administrator with full system access",
        isActive: true,
      });
      console.log("Superadmin role created");
    }

    // Check if superadmin user exists
    const superadminUser = await User.findOne({
      email: process.env.SUPERADMIN_EMAIL,
    });

    if (!superadminUser) {
      // Create superadmin user if it doesn't exist
      await User.create({
        username: "superadmin",
        email: process.env.SUPERADMIN_EMAIL,
        password: process.env.SUPERADMIN_PASSWORD,
        role: superadminRole._id,
        isActive: true,
      });
      console.log("Superadmin user created");
    }

    return true;
  } catch (error) {
    console.error("Error initializing superadmin:", error);
    return false;
  }
};

module.exports = initializeSuperAdmin;
