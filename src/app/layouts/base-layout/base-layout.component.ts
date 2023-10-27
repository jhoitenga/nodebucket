/**
 * Title: base-layout.component.ts
 * Author: Professor Krasso
 * Modified By: Jennifer Hoitenga
 * Date: 10/26/2023
 */

// imports statements
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
//import { SignInService } from 'src/app/sign-in.service';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  // Constructor for the component with injected services.
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {}

  // Function to check if a user is logged in.
  isLoggedIn(): boolean {
    return !!this.cookieService.get('session_user');
  }

  // Function to sign out the user.
  signOut() {
    this.cookieService.deleteAll(); // Delete all cookies.
    this.router.navigate(['/']); // Navigate to the home page.
  }
}
