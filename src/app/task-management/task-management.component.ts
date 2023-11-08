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
import {
  FormsModule,
  FormBuilder,
  Validators,
  Form,
  FormGroup,
} from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // Initialize properties and retrieve values from cookies.
    this.empId = parseInt(this.cookieService.get('session_user') || '1', 10);
    this.empName = this.cookieService.get('fullName');
  }

  // Function to display a snackbar.
  showSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top', // To display snackbar at the top of the screen
      panelClass: 'app-notification-success',
    });
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
          this.showSnackBar('Task has been created', '', 5000); // Snackbar to display success message
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

  // Method to update task status.
  updateTaskStatus(empId: number, taskId: number, status: string) {
    const taskUpdateInfo = {
      taskId,
      status,
    };
    this.taskService.updateTask(empId, taskUpdateInfo).subscribe({
      next: (res) => {
        this.showSnackBar('Task has been updated', '', 5000); // Snackbar to display success message
        //console.log(res);
      },
      error: (err) => {
        //console.log(err.message);
        this.errorMessage =
          'Failed to update task status. Please try again later.';
      },
    });
  }

  // Method to delete a task from 'done'.
  deleteTasks(taskId: number | undefined): void {
    //console.log('deleteDoneTask called with taskId:', taskId);
    if (taskId === undefined) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(this.empId, taskId).subscribe({
          next: (res) => {
            this.done = this.done.filter((task) => task.taskId !== taskId);
            this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
            this.showSnackBar('Task has been deleted', '', 5000);
            //console.log('Task successfully deleted');
          },
          error: (err) => {
            //console.error(err.message);
            this.errorMessage =
              'Failed to delete task. Please try again later.';
          },
        });
      }
    });
  }

  // Method to handle task dragging and dropping between lists.
  drop(event: CdkDragDrop<ITask[]>) {
    const task: ITask = event.container.data[event.currentIndex];
    const status = event.container.id === 'todo' ? 'todo' : 'done';
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('Moved item in array', event.container.data);
      if (task.taskId !== undefined) {
        this.updateTaskStatus(this.empId, task.taskId, status);
      } else {
        console.error('Task ID is undefined. Cannot update task status.');
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(
        `Item moved from one list to another from ${event.previousIndex} to ${event.currentIndex}`
      );

      const task: ITask = event.container.data[event.currentIndex];
      const status = event.container.id === 'todo' ? 'todo' : 'done';

      if (task.taskId !== undefined) {
        this.updateTaskStatus(this.empId, task.taskId, status);
      } else {
        console.error('Task ID is undefined. Cannot update task status.');
      }
    }
  }
}
