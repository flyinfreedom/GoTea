/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupBuyProductComponent } from './group-buy-product.component';

describe('GroupBuyProductComponent', () => {
  let component: GroupBuyProductComponent;
  let fixture: ComponentFixture<GroupBuyProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBuyProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
