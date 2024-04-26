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
        console.log(response);
        this.ordenance = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + response.ordenance);
        this.bulletin = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + response.bulletin);
        this.rapport = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + response.rapport);
      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
  }

  onFileSelected(event: any, index: any): void {
    const file = event.target.files[0];
    this.fileNames[index - 1] = file ? file.name : '';
  }

  onSelect(event: any) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    if (selectedValue) {
      this.selectedUserId = selectedValue;
      console.log('Selected user ID:', this.selectedUserId);
    }
  }

  uploadFiles(): void {
    const file1Input = document.getElementById('inputGroupFile01') as HTMLInputElement;


    // Check if files are selected
    if (!file1Input || !file1Input.files ) {
      console.error('Please select file.');
      return;
    }

    const file1 = file1Input.files[0];


    if (!file1) {
      console.error('Please select file.');
      return;
    }

    this.documentService.updateFiles(this.document, file1).subscribe({
      next: (res) => {
        console.log('Files uploaded successfully:', res);
        this.toastr.success('Document envoyée', 'Confirmation');
        // Handle success response
      },
      error: (err) => {
        console.error('Error uploading files:', err);
        alert("erreur");
        // Handle error
      }
    });
  }

  onFile1Selected(event: any) {
    this.file1 = event.target.files[0];
  }


}

