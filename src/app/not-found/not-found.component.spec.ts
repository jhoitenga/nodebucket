/*
 * Title: not-found.component.spec.ts
 * Author: Jennifer Hoitenga
 * Date: 11/6/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
