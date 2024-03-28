import { Component } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pdf-r-c-op',
  templateUrl: './pdf-r-c-op.component.html',
  styleUrl: './pdf-r-c-op.component.css'
})
export class PdfRCOpComponent {

  data: HTMLElement | null | undefined


  public convetToPDF() {
    this.data = document.getElementById('contentToConvert');
  html2canvas(this.data!).then(canvas => {
// Few necessary setting options
var imgWidth = 209;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;

const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('new-file.pdf'); // Generated PDF
});
}
}


