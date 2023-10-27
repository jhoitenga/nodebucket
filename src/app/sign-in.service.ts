/*
 * Title: sign-in.ts
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

// Define the SignInService as an injectable service.
@Injectable({
  providedIn: 'root', // Specify that this service is provided at the root level.
})
export class SignInService {
  employeeIds: Array<number>; // Array to store valid employee IDs.
  private baseUrl: string = 'http://localhost:3000/api'; // Base URL for API requests.

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // Initialize the array of valid employee IDs.
    this.employeeIds = [1007, 1008, 1009, 1010, 1011, 1012];
  }

  // Validates a employee ID against the list of valid IDs.
  validate(employeeId: number) {
    // Check if the provided employee ID exists in the list of valid IDs.
    return this.employeeIds.some((id) => id === employeeId);
  }

  // Fetches employee name using HTTP GET request.
  getEmployeeName(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees/${employeeId}`);
  }
}
