/*
 * Title: employee.js
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 */

// Importing mongoose
const mongoose = require("mongoose");

// Create a Schema object from Mongoose to define the structure of our data.
const Schema = mongoose.Schema;

// Define the schema for the "Employee" collection in MongoDB.
const employeeSchema = new Schema({
  empId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

// Create and export a Mongoose model named "Employee" using the defined schema.
module.exports = mongoose.model("Employee", employeeSchema);
