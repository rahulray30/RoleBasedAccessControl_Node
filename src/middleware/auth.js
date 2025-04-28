const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded data", decoded);
    const authenticatedUser = await User.findById(decoded.userId).populate(
      "role"
    );

    if (!authenticatedUser || !authenticatedUser.isActive) {
      throw new Error();
    }

    req.user = authenticatedUser;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

const authorize = (...roleNames) => {
  return async (req, res, next) => {
    try {
      if (!req.user.role || !req.user.role.isActive) {
        return res.status(403).json({
          message: "You do not have a valid role",
        });
      }

      if (!roleNames.includes(req.user.role.name)) {
        return res.status(403).json({
          message: "You do not have permission to perform this action",
        });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Error checking authorization" });
    }
  };
};

module.exports = { auth, authorize };
