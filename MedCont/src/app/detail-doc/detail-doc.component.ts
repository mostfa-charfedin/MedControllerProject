import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Doc } from '../models/doc';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.component.html',
  styleUrls: ['./detail-doc.component.css'] // Corrected styleUrls
})
export class DetailDocComponent {

  ordenance: SafeResourceUrl | undefined;
  bulletin: SafeResourceUrl | undefined;
  document: Doc = new Doc();
  id: any;
  selectedUserId: string = '';
  searchText: string = '';
  doc: Doc = new Doc();

  fileNames: string[] = ['', '', ''];
  file1: File | null = null;
  file2: File | null = null;
  file3: File | null = null;

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
this.bulletin = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/PDF;base64,' + response.bulletin);

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
    const file2Input = document.getElementById('inputGroupFile02') as HTMLInputElement;
    const file3Input = document.getElementById('inputGroupFile03') as HTMLInputElement;

    // Check if files are selected
    if (!file1Input || !file2Input || !file3Input || !file1Input.files || !file2Input.files || !file3Input.files) {
      console.error('Please select all files.');
      return;
    }

    const file1 = file1Input.files[0];
    const file2 = file2Input.files[0];
    const file3 = file3Input.files[0];

    if (!file1 || !file2 || !file3) {
      console.error('Please select both files.');
      return;
    }

    this.documentService.updateFiles(this.document, file1, file2, file3).subscribe({
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

  onFile2Selected(event: any) {
    this.file2 = event.target.files[0];
  }

  onFile3Selected(event: any) {
    this.file3 = event.target.files[0];
  }
}
