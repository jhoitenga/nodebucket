/*
 * Title: confirmation-dialog.component.spec.css
 * Author: Jennifer Hoitenga
 * Date: 11/1/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Mat Dialog: https://material.angular.io/components/dialog/overview
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
    });
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
