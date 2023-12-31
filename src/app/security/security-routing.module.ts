/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Modified By: Jennifer Hoitenga
 * Date: 10/26/2023
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SignInComponent } from './sign-in/sign-in.component';

// Define the routes for the Security feature module.
const routes: Routes = [
  {
    path: '', // The default path for the Security component.
    component: SecurityComponent,
    children: [
      {
        path: 'sign-in', // Child route for the sign-in page.
        component: SignInComponent,
        title: 'Nodebucket: Sign In',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
