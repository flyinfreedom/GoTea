import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLimit'
})
export class StrLimitPipe implements PipeTransform {

  transform(str: string, limit: number): string {
    let result:string;
    if(str.length > limit)
    {
      result = str.substring(0, limit) + " ...";
    }
    else
    {
      result = str;
    }

    return result;
  }

}
