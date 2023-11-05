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
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
        path: 'about', // Child route for the about page.
        component: AboutComponent,
        title: 'Nodebucket: About',
      },
      {
        path: 'contact', // Child route for the contact page.
        component: ContactComponent,
        title: 'Nodebucket: Contact',
      },
      {
        path: 'not-found',
        component: NotFoundComponent, // Route for displaying "Not Found" page.
        title: 'NodeBucket: Not Found',
      },
      {
        path: 'task-management', // Child route for task management.
        component: TaskManagementComponent,
        title: 'Nodebucket: Task Management',
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
  {
    path: '**', // This will catch all other routes.
    redirectTo: 'not-found', // Redirect to the 'not-found' route in the session layout.
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
