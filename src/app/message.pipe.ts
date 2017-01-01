import { FirebService } from './fireb.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'message'
})

export class MessagePipe implements PipeTransform {
  currentUserId: string;

  constructor(private fbsvc: FirebService) {
    this.currentUserId = fbsvc.uid;
  }

  transform(value: string, userid: string, username: string): string {
    let result: string = '';
    if (userid == this.currentUserId) {
      result = value;
    }
    else {
      result = username + "：" + value;
    }
    return result;
  }

}
