import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Doc } from '../models/doc';
import { DocumentService } from '../services/document.service';
import {FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor( private documentService :DocumentService,
    private router:Router, private toastr: ToastrService,) { }

    range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    searchText: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  items: Doc[] = [];
  filteredItems: Doc[] = [];
    loading : boolean = false;
    filterName:String ='';


  dataSource = new MatTableDataSource<Doc>();
  pageSize = 3; // Adjust the default page size as needed
  pageSizeOptions = [3, 5, 10, 25];
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use `!` for non-null assertion

  ngOnInit(): void {
    this.getdocuments();
    this.dataSource.paginator = this.paginator; // Connect data source to paginator
    if (this.paginator) { // Check if paginator exists
      this.paginator.pageSize = this.pageSize; // Set page size only if paginator is available
    }// Set initial page size (optional)
  }

  handlePageChange(event: any) {
    this.pageIndex = event.pageIndex; // Update current page
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize; // Update internal page size
      this.pageIndex = 0; // Reset to first page when size changes
    }
  }



  get filter() {
    if (!this.items) return [];

    let filteredItems = this.items;

    if (this.searchText === '') {
      filteredItems = this.items;

    } else {
      filteredItems = filteredItems.filter(item =>
        String(item.id) === this.searchText
      );
  }
  if (this.startDate && this.endDate) {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  filteredItems = filteredItems.filter(item => {
    const itemDate = new Date(item.dateAffectation);
    const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
    const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
  });
  }

  return filteredItems;
  }


  getdocuments(){
  this.documentService.getAllDocuments() .pipe(take(1)).subscribe({
    next: (response : Doc[] = []) => {
    this.items= this.filteredItems=response.filter(document => document.etat == false);

      this.loading = false;
      this.toastr.success('documents loaded successfully', 'Confirmation');

    },
    error: (err: any) => {
      this.toastr.error('filed to load documents', 'Erreur');
      this.loading = false;

    },
  });
}





detail(document: Doc): void {

  console.log(document.id);
    this.documentService.getDocumentById(document.id).subscribe(
      (data) => {
        console.log('data', data, 'id', document.id)
        this.router.navigate([`/detailDoc/${document.id}`]);
      },
      error => console.error('Error updating user validation status:', error)
    );
  }




}
