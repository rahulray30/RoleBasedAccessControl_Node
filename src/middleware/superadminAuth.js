const User = require("../models/User");

/**
 * Middleware to check if the user is a superadmin
 * This middleware should be used after the auth middleware
 */
const superadminAuth = async (req, res, next) => {
  try {
    // Check if user exists in request (added by auth middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Find the user with role populated
    const user = await User.findById(req.user.userId).populate("role");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: "User account is inactive" });
    }

    // Check if user has a role
    if (!user.role) {
      return res.status(403).json({ message: "User has no role assigned" });
    }

    // Check if user's role is active
    if (!user.role.isActive) {
      return res.status(403).json({ message: "User role is inactive" });
    }

    // Check if user's role is superadmin
    if (user.role.name.toLowerCase() !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access denied. Superadmin privileges required." });
    }

    // Add user to request for use in controllers
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error checking superadmin privileges",
      error: error.message,
    });
  }
};

module.exports = superadminAuth;
