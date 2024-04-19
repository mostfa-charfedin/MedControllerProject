import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Doc } from '../models/doc';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-etat-doc',
  templateUrl: './etat-doc.component.html',
  styleUrl: './etat-doc.component.css'
})
export class EtatDocComponent {

  Docs: Doc[] = [];
  filteredDocs: Doc[] = [];
  filterName:String ='';
  loading : boolean = false;

    // Pagination properties
    pageSize: number = 5; // Number of documents per page
    currentPage: number = 1; // Current page number
    totalPages: number = 1; // Total number of pages
    pages: number[] = []; // Array to store page numbers
  constructor(private documentService: DocumentService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loading = true;
    this.loadDocs();

  }

  loadDocs(): void {
    this.documentService.getAllDocuments().subscribe(
      (response) => {

    this.loading = false;
        this.Docs = response;
        this.filteredDocs = this.Docs;
        this.calculatePagination()
      },
      (error) => {

    this.loading = false;
        console.error('Error fetching documents: ', error);
      }
    );
  }
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredDocs.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredDocs.slice(startIndex, startIndex + this.pageSize);
  }


  filter() {
    if (this.filterName === '') {
      this.filteredDocs = this.Docs;
      this.calculatePagination()
    } else {
      this.filteredDocs = this.Docs.filter((Doc) =>
        String(Doc.id) === this.filterName
      );
      this.calculatePagination()
    }
  }



}
