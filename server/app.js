/**
 * Title: app.js
 * Author: Professor Krasso
 * Modified by: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * CORS & Cookies: https://livebook.manning.com/book/cors-in-action/chapter-5/29
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */
"use strict";

// Require statements
const express = require("express");
const createServer = require("http-errors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const employeeAPI = require("./routes/employee-routes");
const mongoose = require("mongoose");

// Import CORS middleware for enabling cross-origin requests.
const cors = require("cors");

// Connecting to MongoDB
const CONN =
  "mongodb+srv://nodebucket_user:s3cr3t@bellevueuniversity.g473hiy.mongodb.net/nodebucket";

// Showing Server Connection Messages
mongoose
  .connect(CONN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection to Nodebucket MongoDB database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Configuration for generating Swagger/OpenAPI documentation.
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nodebucket RESTful APIs",
      version: "1.0.0",
      description: "Nodebucket OpenAPI Documentation",
    },
  },
  apis: ["./server/routes/employee-routes.js"], // Specify the API routes to document.
};

// Create the Express app
const app = express();

// Enable Cross-Origin Resource Sharing for the app.
app.use(cors());

// Configure the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

// Generate OpenAPI documentation using Swagger and serve it at "/api-docs".
const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Use the employee API routes at "/api".
app.use("/api", employeeAPI);

// error handler for 404 errors
app.use(function (req, res, next) {
  next(createServer(404)); // forward to error handler
});

// error handler for all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500); // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

module.exports = app; // export the Express application
