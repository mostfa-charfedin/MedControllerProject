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


  ngOnInit(): void {
    this.getdocuments();

  }

  getdocuments(){

  this.documentService.getAllDocuments() .pipe(take(1)).subscribe({
    next: (res) => { console.log(res)
this.documents = res;
      this.toastr.success('documents loaded successfully', 'Confirmation');

    },
    error: (err: any) => {
      this.toastr.error('filed to load documents', 'Erreur');

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
