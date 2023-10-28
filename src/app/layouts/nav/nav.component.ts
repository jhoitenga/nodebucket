/*
 * Title: nav.component.ts
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/

 */

// imports statements
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  // Constructor for the component with injected services.
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Function to display a snackbar.
  showSnackBar(message: string, action: string, duration: number) {
    const finalMessage = `${message}`;
    this.snackBar.open(finalMessage, action, {
      duration: duration,
      verticalPosition: 'top', // To display snackbar at the top of the screen
      panelClass: 'app-notification-success',
    });
  }

  ngOnInit(): void {}

  // Function to check if a user is logged in.
  isLoggedIn(): boolean {
    return !!this.cookieService.get('session_user');
  }

  // Function to sign out the user.
  signOut() {
    this.showSnackBar('You have been successfully logged out.', 'Close', 5000); // Snackbar to confirm successful logout.
    this.cookieService.deleteAll(); // Delete all cookies.
    this.router.navigate(['/']); // Navigate to the home page.
  }
}
