import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
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


  ngOnInit(): void {
    this.getdocuments();

  }

  getdocuments(){
    let id =Number(localStorage.getItem('id'));
  this.documentService.getDocumentsByUSerId(id) .pipe(take(1)).subscribe({
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



