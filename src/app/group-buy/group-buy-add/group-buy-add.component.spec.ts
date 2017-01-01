/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupBuyAddComponent } from './group-buy-add.component';

describe('GroupBuyAddComponent', () => {
  let component: GroupBuyAddComponent;
  let fixture: ComponentFixture<GroupBuyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBuyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBuyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
