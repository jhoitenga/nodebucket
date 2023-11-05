/*
 * Title: employee-routes.js
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 * MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference (for math.max map syntax reference)
 */

// Require statement for Express
const express = require("express");

// Require statement for Router
const router = express.Router();

// Require statement for Employee
const Employee = require("../models/employee");

/************************************************************************************** */
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
 *         description: Enter a valid Employee ID between 1007-1012
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

/************************************************************************************** */
/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     name: findAllTasks
 *     description:  API for returning all tasks for an employee from MongoDB.
 *     summary: Returns all tasks by empId.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Enter a valid Employee ID between 1007-1012
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

// Define a route handler for GET requests to "/employees/:empId/tasks"
router.get("/employees/:empId/tasks", async (req, res) => {
  try {
    // Check if the empId parameter is missing in the request.
    if (!req.params.empId) {
      // If empId is missing, return a 400 Bad Request response with an error message.
      return res.status(400).send({ message: "Employee ID is required" });
    }

    // Find an employee in the database based on the empId parameter.
    const employee = await Employee.findOne({ empId: req.params.empId });
    // Check if an employee with the specified empId was not found.
    if (!employee) {
      // Log a message to the console and return a 404 Not Found response with an error message.
      console.log("Employee was not found");
      return res.status(404).send({ message: "Employee was not found" });
    }

    // Send tasks from both 'todo' and 'done' arrays as separate properties
    res.json({ todo: employee.todo, done: employee.done });
  } catch (e) {
    console.error(e);
    // Check if the error is due to an invalid ObjectId format.
    if (e.name === "CastError" && e.kind === "ObjectId") {
      // If it's an invalid format, return a 400 Bad Request response with an error message.
      return res.status(400).send({ message: "Invalid ID format" });
    } else {
      // If it's another type of error, return a 500 Internal Server Error response.
      return res
        .status(500)
        .send({ message: `Server Exception: ${e.message}` });
    }
  }
});

/************************************************************************************** */

//  API for creating a task for an employee in MongoDB.
/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     description:  API for creating a task for an employee in MongoDB.
 *     summary: Creates a task by empId.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Enter a valid Employee ID between 1007-1012
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskDescription
 *               - status
 *             properties:
 *               taskDescription:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - done
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

// Define a route handler for POST requests to create tasks for an employee.
router.post("/employees/:empId/tasks", async (req, res) => {
  try {
    // Extract employee ID, task description, and status from request parameters and body.
    const { empId } = req.params;
    const { taskDescription, status } = req.body;
    let { taskId } = req.body;

    // Check if any of the required fields are missing.
    if (!empId || !taskDescription || !status) {
      // If any of them are missing, return a 400 Bad Request response with an error message.
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Find the employee in the database based on empId.
    const employee = await Employee.findOne({ empId });
    // Check if the employee with the specified empId was not found.
    if (!employee) {
      // If not found, return a 404 Not Found response with an error message.
      return res.status(404).send({ message: "Employee not found" });
    }

    // If taskId is not provided, generate a new unique taskId.
    if (!taskId) {
      // Find the maximum taskId among existing tasks and increment it by 1.
      const maxTaskId =
        Math.max(
          0,
          ...employee.todo.map((t) => t.taskId),
          ...employee.done.map((t) => t.taskId)
        ) + 1;
      taskId = maxTaskId;
    }

    //console.log("Generated Task ID:", taskId);

    // Validate taskId to ensure it's a number.
    if (typeof taskId !== "number" || isNaN(taskId)) {
      // If taskId is invalid, return a 400 Bad Request response with an error message.
      return res.status(400).send({ message: "Invalid Task ID" });
    }

    // Check if a task with the same taskId already exists in either 'todo' or 'done'.
    const existingTask =
      employee.todo.find((task) => task.taskId === taskId) ||
      employee.done.find((task) => task.taskId === taskId);

    // If a task with the same ID exists, return a 400 Bad Request response.
    if (existingTask) {
      return res.status(400).send({ message: "Task ID already exists" });
    }

    // Create a new task object with taskId and taskDescription.
    const newTask = { taskId, taskDescription };

    // Add the new task to either 'todo' or 'done' based on the status.
    if (status === "todo") {
      employee.todo.push(newTask);
    } else if (status === "done") {
      employee.done.push(newTask);
    } else {
      // If the status is neither 'todo' nor 'done', return a 400 Bad Request response.
      return res.status(400).send({ message: "Invalid status" });
    }

    // Save the updated employee object in the database.
    await employee.save();
    // Return a 201 Created response with a success message and the newly created task.
    res
      .status(201)
      .send({ message: "Task created successfully", task: newTask });
  } catch (e) {
    console.error(e);
    // Return a 500 Internal Server Error response with a server exception message.
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/************************************************************************************** */

//  API for updating a task for an employee in MongoDB.
/**
 * updateTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     name: updateTask
 *     description:  API for updating a task for an employee in MongoDB.
 *     summary: Updates a task by empId.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Enter a valid Employee ID between 1007-1012
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - status
 *             properties:
 *               taskId:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - done
 *     responses:
 *       '204':
 *         description: No Content
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

// Define a route handler for PUT requests to update an employee's task.
router.put("/employees/:empId/tasks", async (req, res) => {
  try {
    const { empId } = req.params;
    const { taskId, status } = req.body;

    // Validate status of task.
    if (!["todo", "done"].includes(status)) {
      // If status is invalid, return a 400 Bad Request response with an error message.
      return res.status(400).send({ message: "Invalid status value" });
    }

    // Find the employee in the database based on empId.
    const employee = await Employee.findOne({ empId: empId });

    // If Employee not found, return a 404 Not Found response with an error message.
    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // Search both 'todo' and 'done' arrays for the task.
    let task = employee.todo.find((t) => t.taskId === taskId);
    let taskArrayName = "todo";
    if (!task) {
      task = employee.done.find((t) => t.taskId === taskId);
      taskArrayName = "done";
    }

    // If the task wasn't found in either array, send a 404 Not Found response.
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    // Remove the task from the current array.
    employee[taskArrayName] = employee[taskArrayName].filter(
      (t) => t.taskId !== taskId
    );

    // If the status is 'done', add to the 'done' array; if 'todo', add to the 'todo' array.
    if (status === "done") {
      employee.done.push(task);
    } else {
      employee.todo.push(task);
    }

    // Save the updated employee.
    await employee.save();

    // Return a 204 No Content message.
    res.status(204).send({ message: "Task updated successfully" });
    //console.log("Task updated successfully");
    //console.log(employee);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: `Server Error: ${e.message}` });
  }
});

/************************************************************************************** */

//  API for deleting a task for an employee in MongoDB.
/**
 * deleteTask
 * @openapi
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     name: deleteTask
 *     description:  API for deleting a task for an employee in MongoDB.
 *     summary: Deletes a task by empId.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Enter a valid Employee ID between 1007-1012
 *         schema:
 *           type: string
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Enter the ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

// Define a route handler for DELETE requests to delete an employee's task.
router.delete("/employees/:empId/tasks/:taskId", async (req, res) => {
  try {
    const { empId, taskId } = req.params;

    if (!empId || !taskId) {
      return res
        .status(400)
        .send({ message: "Emp ID and Task ID are required" });
    }

    const employee = await Employee.findOneAndUpdate(
      { empId: empId },
      { $pull: { todo: { taskId: taskId }, done: { taskId: taskId } } },
      { new: true } // Return the updated document
    );

    // If Employee not found, return a 404 Not Found response with an error message.
    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // Return a 204 No Content message.
    res.status(204).send({ message: "Task deleted successfully" });
    console.log("Task deleted successfully");
    console.log(employee);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: `Server Error: ${e.message}` });
  }
});

// Export the router module for use in other parts of the application.
module.exports = router;
