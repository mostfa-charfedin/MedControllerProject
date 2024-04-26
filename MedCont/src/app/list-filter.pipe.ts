import { Pipe, PipeTransform } from '@angular/core';
import { Doc } from './models/doc';
import { FiltredItemService } from './services/filtred-item.service';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

/*
  constructor(private filteredItemsService: FiltredItemService) {}
  transform(items: Doc[], searchText: string, startDate: Date | null, endDate: Date | null): Doc[] {
    if (!items) return [];

    let filteredItems = items;

    if (searchText === '') {
      filteredItems = items;

    } else {
      filteredItems = filteredItems.filter(item =>
        String(item.id) === searchText
      );
}
if (startDate && endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  filteredItems = filteredItems.filter(item => {
    const itemDate = new Date(item.date);
    const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
    const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
  });
}

 // If no items are found after filtering, return a special document object
 this.filteredItemsService.updateFilteredItems(filteredItems);
    return filteredItems;
  }*/
}
