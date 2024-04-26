import { Component, ElementRef, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';
@Component({
  selector: 'app-pdf-r-c-op',
  templateUrl: './pdf-r-c-op.component.html',
  styleUrl: './pdf-r-c-op.component.css'
})
export class PdfRCOpComponent {

  data: HTMLElement | null | undefined;
  @ViewChild('contentToPrint') contentToPrintRef!: ElementRef;

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
}


