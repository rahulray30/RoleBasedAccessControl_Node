const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Login user and generate token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).populate("role");

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("token ", token);

    // Return user info and token
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};
