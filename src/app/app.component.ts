/**
 * Title: app.component.ts
 * Author: Professor Krasso
 * Modified By: Jennifer Hoitenga
 * Date: 10/26/2023
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Nodebucket';
}
