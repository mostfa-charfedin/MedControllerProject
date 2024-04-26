import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doc } from '../models/doc';

@Injectable({
  providedIn: 'root'
})
export class FiltredItemService {
  private filteredItemsSubject = new BehaviorSubject<Doc[]>([]);
  filteredItems$ = this.filteredItemsSubject.asObservable();

  updateFilteredItems(filteredItems: Doc[]) {
    this.filteredItemsSubject.next(filteredItems);
  }
}
