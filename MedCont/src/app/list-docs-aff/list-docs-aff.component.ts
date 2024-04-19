import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { ToastrService } from 'ngx-toastr';
import { Doc } from '../models/doc';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-docs-aff',
  templateUrl: './list-docs-aff.component.html',
  styleUrl: './list-docs-aff.component.css'
})
export class ListDocsAffComponent {
  constructor( private documentService :DocumentService,
    private router:Router, private toastr: ToastrService) { }

    documents: Doc[] = [];
    loading : boolean = false;
    ListDocs: Doc[] = [];
    filteredListDocs: Doc[] = [];
    filterName: string = '';


     // Pagination properties
  pageSize: number =3; // Number of documents per page
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages
  pages: number[] = []; // Array to store page numbers

  ngOnInit(): void {
    this.getDocuments();
    this.loading = true;

  }

  getDocuments() {
    let id = Number(localStorage.getItem('id'));
    this.documentService
      .getDocumentsByUSerId(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.documents = res;
          this.ListDocs = res;
          this.filteredListDocs = this.ListDocs;
          this.loading = false;
          this.toastr.success('Documents loaded successfully', 'Confirmation');
          this.calculatePagination();
        },
        error: (err: any) => {
          this.loading = false;
          if (err.error.errorCode === 'NO_DOCUMENT_TO_LOAD') {
            this.toastr.warning('NO DOCUMENT TO LOAD', 'Error');
          }
        }
      });
  }
calculatePagination() {
  this.totalPages = Math.ceil(this.filteredListDocs.length / this.pageSize);

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

get paginatedList(): Doc[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.filteredListDocs.slice(startIndex, startIndex + this.pageSize);
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
    if(this.filterName === ""){
      this.filteredListDocs = this.ListDocs;
      this.calculatePagination()
    }
    else {
        this.filteredListDocs = this.ListDocs.filter((document) =>
          String(document.id) === this.filterName
        );
        this.calculatePagination()
      }
  }


}



