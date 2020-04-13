import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(id: any, list: any[]): any {
    const response = list.find(item => {
        return item.id === id;
    });
    return response;
  }

}
