/*
 * Title: sign-in.guard.ts
 * Author: Jennifer Hoitenga
 * Date: 10/26/2023
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// Define the SignInGuard as an injectable service.
@Injectable({
  providedIn: 'root', // Specify that this guard is provided at the root level.
})
export class SignInGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  // Guard that checks whether a session user is authenticated.
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser) {
      // User is authenticated; allow access to the route.
      return true;
    } else {
      // User is not authenticated; navigate to the sign-in page and deny access.
      this.router.navigate(['/session/sign-in']); // Redirect to the sign-in page.
      return false; // Deny access to the route.
    }
  }
}
