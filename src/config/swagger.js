const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Role-Based Access Control API",
      version: "1.0.0",
      description: "API documentation for Role-Based Access Control system",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3003}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

module.exports = swaggerJsdoc(options);
