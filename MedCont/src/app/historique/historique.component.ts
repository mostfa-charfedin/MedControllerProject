import { Component, ViewChild } from '@angular/core';
import { Historique } from '../models/historique';
import { HistoriqueService } from '../services/historique.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

import {FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  searchText: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  items: Historique[] = [];
  filteredItems: Historique[] = [];
  loading : boolean = false;



  dataSource = new MatTableDataSource<User>();
  pageSize = 5; // Adjust the default page size as needed
  pageSizeOptions = [ 5, 10, 25, 50, 100];
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use `!` for non-null assertion
  constructor(private historiqueService: HistoriqueService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loadHistory();
    this.dataSource.paginator = this.paginator; // Connect data source to paginator
    if (this.paginator) { // Check if paginator exists
      this.paginator.pageSize = this.pageSize; // Set page size only if paginator is available
    } // Set initial page size (optional)
  }
  handlePageChange(event: any) {
    this.pageIndex = event.pageIndex; // Update current page
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize; // Update internal page size
      this.pageIndex = 0; // Reset to first page when size changes
    }
  }
  loadHistory(): void {
    this.historiqueService.getAllHistorys().subscribe(
      (response : Historique [] = []) => {
        this.items= this.filteredItems= response;
      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );
  }


  get filter() {
    if (!this.items) return [];

    let filteredItems = this.items;

    if (this.searchText === '') {
      filteredItems = this.items

    } else {
      filteredItems = this.items.filter((historique) =>
        historique.action?.toLowerCase().includes(this.searchText.toLowerCase())
        );

  }
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    filteredItems = filteredItems.filter(item => {
      const itemDate = new Date(item.time);
      const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
      const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
    });
    }
  return filteredItems;
  }
}

