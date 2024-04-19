import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Doc } from '../models/doc';
import { DocumentService } from '../services/document.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor( private documentService :DocumentService,
    private router:Router, private toastr: ToastrService) { }

    documents: Doc[] = [];
    loading : boolean = false;
    Docs: Doc[] = [];
    filteredDocs: Doc[] = [];
    filterName:String ='';
      // Pagination properties
      pageSize: number = 3; // Number of documents per page
      currentPage: number = 1; // Current page number
      totalPages: number = 1; // Total number of pages
      pages: number[] = []; // Array to store page numbers
  ngOnInit(): void {
    this.getdocuments();
        this.loading = true;
  }

  getdocuments(){

  this.documentService.getAllDocuments() .pipe(take(1)).subscribe({
    next: (response) => {
      this.Docs = response;
      this.filteredDocs = this.Docs;
      this.calculatePagination()
this.loading = false;
      this.toastr.success('documents loaded successfully', 'Confirmation');

    },
    error: (err: any) => {
      this.toastr.error('filed to load documents', 'Erreur');
      this.loading = false;

    },
  });
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
