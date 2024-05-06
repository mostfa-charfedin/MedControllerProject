import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../models/doc';
@Component({
  selector: 'app-pdf-r-c-op',
  templateUrl: './pdf-r-c-op.component.html',
  styleUrl: './pdf-r-c-op.component.css'
})
export class PdfRCOpComponent implements OnInit{
  constructor(

    private documentService: DocumentService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router,
  ) { }
  id!: number;
  document!: Doc;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.documentService.getDocumentById(this.id).subscribe(
      (response: any) => {
        this.document = response;
      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
  }
  data: HTMLElement | null | undefined;
  @ViewChild('contentToPrint') contentToPrintRef!: ElementRef;
  currentDate = new Date();
  year = this.currentDate.getFullYear();
month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
day = this.currentDate.getDate().toString().padStart(2, '0');
dateString = `${this.year}/${this.month}/${this.day}`;
  public printContent() {
    const printableElement = this.contentToPrintRef.nativeElement;
    if (!printableElement) {
      console.error('Element with ID "contentToPrint" not found');
      return;
    }

    html2canvas(printableElement, { scale: 2, logging: true, width: printableElement.scrollWidth, height: printableElement.scrollHeight })
      .then(canvas => {
        const contentDataURL = canvas.toDataURL('image/jpeg', 1);

        printJS({
          printable: contentDataURL,
          type: 'image',
          base64: true // Required for dataURL as printable
        });
      })
      .catch(error => {
        console.error('Error converting to canvas:', error);
      });
  }
  public convertToPDF() {
    this.data = document.getElementById('contentToConvert');
    html2canvas(this.data!, { scale: 2, logging: true, width: this.data!.scrollWidth, height: this.data!.scrollHeight }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1); // Maximum quality

      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const imgWidth = 209;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 0;

      pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);

      // Save the PDF
      pdf.save('rapport-optique.pdf');
    });
  }


  public saveDoc() {
    this.data = document.getElementById('contentToConvert');
    html2canvas(this.data!, { scale: 2, logging: true, width: this.data!.scrollWidth, height: this.data!.scrollHeight }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1); // Maximum quality

      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const imgWidth = 209;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 0;

      pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);

      // Convert the PDF to a Blob
      const blob = pdf.output('blob');
      console.log('File uploaded successfully:',blob );
      const file = new File([blob], 'rapport-dentaire.pdf', { type: 'application/pdf' });

      // Update document with the file
      this.documentService.updateFile(this.document.id,file).subscribe({
        next: (res: any) => {

          this.toastr.success('Document envoyé', 'Confirmation');
          this.router.navigate([`/mesDocs`]);
        },
        error: (err: any) => {
          console.error('Error uploading file:', err);
          alert("Erreur lors de l'envoi du document");
          // Handle error
        }
      });
    });
  }
}


