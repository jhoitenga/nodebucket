/*
 * Title: sign-in.component.ts
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 * Angular Snackbar: https://material.angular.io/components/snack-bar/overview
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SignInService } from 'src/app/sign-in.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  // Initialize the sign-in form as a FormGroup.
  signInForm: FormGroup = new FormGroup({});
  errorMessage: string = ''; // Initialize an error message variable.

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private signInService: SignInService,
    private snackBar: MatSnackBar
  ) {}

  // Function to display a snackbar.
  showSnackBar(
    message: string,
    action: string,
    duration: number,
    dynamicContent: string = '',
    contentEnd: string = ''
  ) {
    const finalMessage = `${message}${dynamicContent}${contentEnd}`; // Concatenate the message with the dynamic content
    this.snackBar.open(finalMessage, action, {
      duration: duration,
      verticalPosition: 'top', // To display snackbar at the top of the screen
      panelClass: 'app-notification-success',
    });
  }

  ngOnInit(): void {
    // Initialize the sign-in form with validation rules
    this.signInForm = this.fb.group({
      empId: [
        '', // Initial empty value
        [
          Validators.required, // Field is required
          Validators.pattern('^[0-9]*$'), // Only numeric input allowed
        ],
      ],
    });
  }

  // Function to access form controls.
  get form() {
    return this.signInForm.controls;
  }

  // Function to handle form submission.
  onSubmit() {
    const formValues = this.signInForm.value;
    const employeeId = parseInt(formValues.empId);

    // Validate the employee ID using the signInService.
    if (this.signInService.validate(employeeId)) {
      this.signInService.getEmployeeName(employeeId).subscribe({
        next: (res) => {
          this.showSnackBar('Welcome, ', 'Close', 5000, res.firstName, '!'); // Snackbar to confirm successful login
          this.cookieService.set('session_user', employeeId.toString(), 1);
          this.cookieService.set(
            'fullName',
            `${res.firstName} ${res.lastName}`,
            1
          );
          this.router.navigate(['/task-management']);
        },
        error: (error) => {
          console.error('Error fetching employee name', error);
          this.errorMessage =
            'Failed to fetch employee details, please try again.';
        },
      });
    } else {
      console.log('Error: Invalid Employee ID');
      this.errorMessage =
        'The Employee ID you entered is invalid, please try again.';
    }
  }
}
