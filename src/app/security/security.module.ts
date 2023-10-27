/**
 * Title: security.module.ts
 * Author: Professor Krasso
 * Modified By: Jennifer Hoitenga
 * Date: 10/26/2023
 */

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [SecurityComponent, SignInComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class SecurityModule {}
