/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Modified By: Jennifer Hoitenga
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Constructor for the component with injected services.
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {}

  // Function to check if a user is logged in.
  isLoggedIn(): boolean {
    return !!this.cookieService.get('session_user');
  }
}
