/*
 * Title: employee.js
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

// Importing mongoose
const mongoose = require("mongoose");

// Create a Schema object from Mongoose to define the structure of our data.
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  taskId: { type: Number, required: false },
  taskDescription: { type: String, required: true },
});

let employeeSchema = new Schema({
  empId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  todo: [itemSchema],
  done: [itemSchema],
});

// Create and export a Mongoose model named "Employee" using the defined schema.
module.exports = mongoose.model("Employee", employeeSchema);
