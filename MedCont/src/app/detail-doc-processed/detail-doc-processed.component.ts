import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Doc } from '../models/doc';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detail-doc-processed',
  templateUrl: './detail-doc-processed.component.html',
  styleUrl: './detail-doc-processed.component.css'
})
export class DetailDocProcessedComponent implements OnInit{


  ordenance: SafeResourceUrl | undefined;
  bulletin: SafeResourceUrl | undefined;
  rapport: SafeResourceUrl | undefined;
  document: Doc = new Doc();
  id: any;
  selectedUserId: string = '';
  searchText: string = '';
  doc: Doc = new Doc();

  fileNames: string[] = ['', '', ''];
  file1: File | null = null;


  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.documentService.getDocumentById(this.id).subscribe(
      (response: any) => {
        this.document = response;

        this.ordenance = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + this.document.ordenance);
        this.bulletin  = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + this.document.bulletin);     
        this.rapport   = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + response.rapport);

      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
  }




}

