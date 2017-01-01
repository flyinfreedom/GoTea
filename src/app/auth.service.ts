import { FirebService } from './fireb.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private fbsvc: FirebService) {
  }

}
