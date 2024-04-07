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

  constructor(private documentService: DocumentService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loadDocs();
  }

  loadDocs(): void {
    this.documentService.getAllDocuments().subscribe(
      (response) => {
        this.Docs = response;
        this.filteredDocs = this.Docs;

      },
      (error) => {
        console.error('Error fetching documents: ', error);
      }
    );
  }

  filter() {
    if (this.filterName === '') {
      this.filteredDocs = this.Docs;
    } else {
      this.filteredDocs = this.Docs.filter((Doc) =>
        String(Doc.id) === this.filterName
      );
    }
  }



}
