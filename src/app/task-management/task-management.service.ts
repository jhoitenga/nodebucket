/*
 * Title: task-management.service.component.ts
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 * Angular: https://angular.io/guide/http-server-communication
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from './../model/task';
import { TaskResponse } from './../model/taskResponse';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // Define a private method to handle HTTP errors and return an Observable with an error message.
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMsg =
      error.message || 'Something bad happened; please try again later.';
    console.error('Error from handleError:', errorMsg);
    return throwError(errorMsg);
  }

  // Define the base URL for the API.
  private baseUrl: string = 'http://localhost:3000';

  // Retrieve tasks for a specific employee by their empId.
  getTasks(empId: number): Observable<ITask[]> {
    const url = `${this.baseUrl}/api/employees/${empId}/tasks`;
    // Send an HTTP GET request to retrieve tasks and handle any errors.
    return this.http.get<ITask[]>(url).pipe(catchError(this.handleError));
  }

  // Add a new task for a specific employee identified by empId.
  addTask(
    empId: number,
    task: { taskDescription: string; status: string }
  ): Observable<any> {
    const url = `${this.baseUrl}/api/employees/${empId}/tasks`;
    // Send an HTTP POST request to add a new task.
    return this.http.post<any>(url, task);
  }

  // Update an existing task for a specific employee identified by empId.
  updateTask(
    empId: number,
    task: { taskId: number; status: string }
  ): Observable<any> {
    const url = `${this.baseUrl}/api/employees/${empId}/tasks/`;
    //console.log(empId, task.taskId, task.status);
    return this.http.put<any>(url, task);
  }

  // Delete an existing task for a specific employee identified by empId.
  deleteTask(empId: number, taskId: number): Observable<any> {
    const url = `${this.baseUrl}/api/employees/${empId}/tasks/${taskId}`;
    //console.log('Making DELETE request to:', url);
    return this.http.delete<any>(url);
  }
}
