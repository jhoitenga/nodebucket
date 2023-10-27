/*
 * Title: employee-routes.js
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 */

// Require statement for Express
const express = require("express");

// Require statement for Router
const router = express.Router();

// Require statement for Employee
const Employee = require("../models/employee");

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - Employees
 *     name: findEmployeeById
 *     description:  API for returning an Employee from MongoDB.
 *     summary: Returns an Employee document by empId.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Enter the Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

// Define a GET route that handles requests to "/api/employees/{empId}".
router.get("/employees/:empId", async (req, res) => {
  try {
    // Attempt to find an employee document in the MongoDB collection based on empId.
    const employee = await Employee.findOne({ empId: req.params.empId });

    if (!employee) {
      // If no employee is found, return a 404 Not Found response.
      console.log("Employee was not found");
      res.status(404).send({
        message: "Employee was not found",
      });
    } else {
      // If an employee is found, return a JSON response with the employee data.
      console.log(employee);
      res.json(employee);
    }
  } catch (e) {
    console.log(e);
    if (e.name === "CastError" && e.kind === "ObjectId") {
      // If the error is due to an invalid ID format, return a 400 Bad Request response.
      res.status(400).send({ message: "Invalid ID format" });
    } else {
      // For other server exceptions, return a 500 Internal Server Error response.
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  }
});

// Export the router module for use in other parts of the application.
module.exports = router;
