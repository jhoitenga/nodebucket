/*
 * Title: task-management.component.ts
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  Form,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragPlaceholder,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './task-management.service';
import { ITask } from './../model/task';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
})
export class TaskManagementComponent implements OnInit {
  // Define properties for the component.
  todoForm!: FormGroup;
  empId: number;
  tasks: ITask[] = [];
  done: ITask[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  empName: string = '';

  constructor(
    private cookieService: CookieService,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    // Initialize properties and retrieve values from cookies.
    this.empId = parseInt(this.cookieService.get('session_user') || '1', 10);
    this.empName = this.cookieService.get('fullName');
  }

  ngOnInit(): void {
    // Load tasks and initialize the form on component initialization.
    this.loadTasks();
    this.todoForm = this.fb.group({
      item: ['', [Validators.required, Validators.maxLength(64)]],
    });
  }

  // Method to load tasks for the current employee.
  loadTasks(): void {
    //console.log('Loading tasks');
    this.taskService.getTasks(this.empId).subscribe({
      next: (data: any) => {
        //console.log('Received tasks:', data);
        // Assign the 'todo' and 'done' task arrays from the response to component properties
        this.tasks = data.todo;
        this.done = data.done;
      },
      // Handle errors in the HTTP request (error).
      error: (err) => {
        console.error('Error: ', err);
        // Set an error message to inform the user about the failure to load tasks.
        this.errorMessage = 'Failed to load tasks. Please try again later.';
      },
    });
  }

  // Method to add a new task.
  addTask(): void {
    // Check if the form is valid before proceeding.
    if (this.todoForm.valid) {
      // Extract task description from the form input.
      const taskDescription = this.todoForm.controls['item'].value;

      // Define the initial status as 'todo'
      const status = 'todo';

      // Create a task object using the extracted description and status.
      const task = { taskDescription, status };

      // Use the taskService to add the task for the current employee (empId)
      this.taskService.addTask(this.empId, task).subscribe({
        next: (response) => {
          //console.log('Task created:', response.task);
          // Push the newly created task to the 'tasks' array.
          this.tasks.push(response.task);
          // Log a message indicating that the task was added and reset the form.
          //console.log('Task added');
          this.todoForm.reset();
        },
        // Handle errors in the HTTP request (error).
        error: (err) => {
          //console.error('Error: ', err);
          // Set an error message to inform the user about the failure to add the task.
          this.errorMessage = 'Failed to add task. Please try again later.';
        },
      });
    }
  }

  // Method to delete a task from 'todo'.
  deleteTask(i: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks.splice(i, 1);
    }
  }

  // Method to delete a task from 'done'.
  deleteDoneTask(i: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.done.splice(i, 1);
    }
  }

  // Method to handle task dragging and dropping between lists.
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
