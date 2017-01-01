/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirebService } from './fireb.service';

describe('FirebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebService]
    });
  });

  it('should ...', inject([FirebService], (service: FirebService) => {
    expect(service).toBeTruthy();
  }));
});
