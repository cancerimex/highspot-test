import { Pipe, PipeTransform } from '@angular/core';
/**
 * Filter Pipe
 *
 * @example
 *  <input type="text" [(ngModel)]="search" [formControl]="search" />
 *  <!-- Then on the ngFor loop -->
 *  <tr *ngFor="let product of products | filter: search:'name'">
 */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<any>, searchText: string,  prop?: any): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    if (searchText !== undefined) {
      let flag: boolean;
      if (Array.isArray(items) && typeof items[0] === 'object') {
        flag = true;
      } else {
        flag = false;
      }

      return items.filter(item => {
        const val = flag ? item[prop] : item;
        return val.toString().toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      return items;
    }
  }

}

