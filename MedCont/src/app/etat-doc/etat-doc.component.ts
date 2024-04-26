import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Doc } from '../models/doc';
import { DocumentService } from '../services/document.service';
import {FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-etat-doc',
  templateUrl: './etat-doc.component.html',
  styleUrl: './etat-doc.component.css'
})
export class EtatDocComponent {
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



  dataSource = new MatTableDataSource<User>();
  pageSize = 5; // Adjust the default page size as needed
  pageSizeOptions = [ 5, 10, 25, 50, 100];
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use `!` for non-null assertion
  constructor(private documentService: DocumentService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loading = true;
    this.loadDocs();
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
  loadDocs(): void {
    this.documentService.getAllDocuments().subscribe(
      (response) => {

    this.loading = false;
    this.items= this.filteredItems = response;


      },
      (error) => {

    this.loading = false;
        console.error('Error fetching documents: ', error);
      }
    );
  }


  get filter() {
    if (!this.items) return [];

    let filteredItems = this.items;

    if (this.searchText === '') {
      filteredItems = this.items

    } else {
      filteredItems = this.items.filter((Doc) =>
        String(Doc.id) === this.searchText
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
details(id:Number){
  this.router.navigate([`/detailDocProc/${id}`]);
}
}
