/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Modified By: Jennifer Hoitenga
 * Date: 10/26/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { SignInGuard } from './sign-in.guard';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '', // The default route (root path).
    component: BaseLayoutComponent,
    children: [
      {
        path: '', // Default child route, maps to the HomeComponent.
        component: HomeComponent,
        title: 'Nodebucket: Home', // Title for the home page
      },
      {
        path: 'home', // Child route for the home page.
        component: HomeComponent,
        title: 'Nodebucket: Home',
      },
      {
        path: 'task-management', // Child route for task management.
        component: TaskManagementComponent,
        canActivate: [SignInGuard],
      },
    ],
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
  },
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
