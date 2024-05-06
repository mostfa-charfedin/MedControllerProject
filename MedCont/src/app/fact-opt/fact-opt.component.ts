import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';
import { Doc } from '../models/doc';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToWords } from 'to-words';
import { DataSenderService } from '../services/data-sender.service';
import { ToastrService } from 'ngx-toastr';
import { BordereauService } from '../services/bordereau.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fact-opt',
  templateUrl: './fact-opt.component.html',
  styleUrl: './fact-opt.component.css'
})
export class FactOptComponent implements OnInit {


@ViewChild('contentToPrint') contentToPrintRef!: ElementRef;
  constructor(private userService: UserService, private router:Router, private bordereauService: BordereauService, private toastr: ToastrService,private dataSender: DataSenderService,) {}
  ngOnInit(): void {
    let id =Number(localStorage.getItem('id'));
    this.userService.getUserById(id).subscribe({
    next:  (data: User) => {
        this.user = data;

      },
      error: (error :any )=> {
        console.error(error);
        alert('User Not Found');
      }
  });

  this.listDocs= this.dataSender.getList();
  this.totalLettres=this.toWords.convert(this.dataSender.getSum()+1);
  this.total=this.dataSender.getSum();
  this.bordereau=this.dataSender.getFile();
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
  bordereau!:File;
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


      pdf.save('facture-opticien.pdf');
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

      const documentIds: number[] = this.listDocs.map(document => document.id);

      this.bordereauService.factureDocument(this.bordereau,file,documentIds,this.user?.id,this.total+1).subscribe({
        next: (res: any) => {
          this.router.navigate([`/processedDocs`]);
          this.toastr.success('Bordereau et facture envoyé', 'Confirmation');

        },
        error: (err: any) => {
          if (err.status !== 201) {
            alert("Erreur lors de l'envoi du document");
          }

        }
      });
    });
  }
}




