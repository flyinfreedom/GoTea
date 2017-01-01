/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuyingListComponent } from './buying-list.component';

describe('BuyingListComponent', () => {
  let component: BuyingListComponent;
  let fixture: ComponentFixture<BuyingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
