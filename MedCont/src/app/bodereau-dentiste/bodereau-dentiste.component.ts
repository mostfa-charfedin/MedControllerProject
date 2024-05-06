import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import printJS from 'print-js';
import { Doc } from '../models/doc';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToWords } from 'to-words';
import { DataSenderService } from '../services/data-sender.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bodereau-dentiste',
  templateUrl: './bodereau-dentiste.component.html',
  styleUrl: './bodereau-dentiste.component.css',

})
export class BodereauDentisteComponent implements OnInit {

  @ViewChild('contentToPrint') contentToPrintRef!: ElementRef;



  constructor(private userService: UserService,private dataSender: DataSenderService, private router:Router,) {}
  ngOnInit(): void {
    let id = Number(localStorage.getItem('id'));

    this.userService.getUserById(id).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (error: any) => {
        console.error(error);
        alert('User Not Found');
      }
    });

    this.listDocs = this.dataSender.getList();
    const sum = this.dataSender.getSum();
    if (sum !== undefined) {
      this.totalLettres = this.toWords.convert(sum);
      this.total = sum;
    } else {
      this.totalLettres = '';
      this.total = 0;
    }
  }

toWords = new ToWords({
  localeCode: 'fr-FR',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {

      name: 'Dinar',
      plural: 'Dinars',
      symbol: 'TND',
      fractionalUnit: {
        name: 'Millime',
        plural: 'Millimes',
        symbol: '',
      },
    },
  },
});

  data: HTMLElement | null | undefined;
user?: User;
listDocs!: Doc[];
total!:number;
totalLettres!:string;


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
      pdf.save('bordereau-Dentiste.pdf');

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
   this.dataSender.setFile(file);
   this.dataSender.setList(this.listDocs);
   this.dataSender.setSum(this.total);
   this.router.navigate([`/fctopt`]);
    });
  }
}


