require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const roleRoutes = require("./routes/roleRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const authRoutes = require("./routes/authRoutes");
const actionRoutes = require("./routes/actionRoutes");
const initializeSuperAdmin = require("./config/initSuperAdmin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Initialize superadmin role and user
    await initializeSuperAdmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Role Based Access Control API" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Role routes
app.use("/api/roles", roleRoutes);

// Module routes (no authentication required)
app.use("/api/modules", moduleRoutes);

app.use("/api/actions", actionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
