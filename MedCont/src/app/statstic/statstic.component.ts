import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Bordereau } from '../models/bordereau';
import { BordereauService } from '../services/bordereau.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../services/document.service';
import { Doc } from '../models/doc';
@Component({
  selector: 'app-statstic',
  templateUrl: './statstic.component.html',
  styleUrl: './statstic.component.css'
})
export class StatsticComponent implements OnInit{
  constructor(private bordereauService: BordereauService,
     private documentService: DocumentService,
      private toastr: ToastrService,
      private cdr: ChangeDetectorRef,) {
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from({length: currentYear - 1900}, (_, index) => 2018 + index);
  }

  lineData: any;
  barData: any;
  pieData: any;
  barOptions: any;
  pieOptions: any;
  Docs: Doc[] = [];
  filteredDocs: Doc[] = [];
  items: Bordereau[] = [];
  filteredItems: Bordereau[] = [];
  selectedYear: number = new Date().getFullYear()

  availableYears!: number[];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  startDate: Date =new Date() ;
  endDate: Date =new Date();

  doctraite!:number;
  docnontraite!:number
  totalAmountPerMonth = Array(12).fill(0);
  ngOnInit() {
    const today = new Date();
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.loadDocuments()
    this.loadFactures()


    // Initialize the range form control with the start and end dates
    this.range.setValue({ start: this.startDate, end: this.endDate });
    this.initCharts();
  }

  loadDocuments(){
    this.documentService.getDocumentsByUSerId(Number(localStorage.getItem('id'))).subscribe(
      (response :  Doc[] = []) => {
        this.Docs = response;
        this.filterDocs()
          },
          (error) => {
            console.log('Pas de statstiques', error);
            this.toastr.warning('Pas de statstiques','error');
          }
        );
  }

  loadFactures(){
    this.bordereauService.findBordereauByUserId(Number(localStorage.getItem('id'))).subscribe(
      (response :  Bordereau[] = []) => {
        this.items= response;
this.filter()
          },
          (error) => {
            console.error('Pas de statstiques', error);
            this.toastr.warning('Pas de statstiques','error');
          }
        );
  }
  filter() {
    // Reset the total amount per month array
    this.totalAmountPerMonth = Array(12).fill(0);

    let filteredItems = this.items.filter(Bordereau => Bordereau.paye == true);

    filteredItems.forEach(item => {
        const itemDate = new Date(item.dateFacturation);
        if (itemDate.getFullYear() === this.selectedYear) {
            const month = itemDate.getMonth();

            // Add the total amount of the invoice to the corresponding month's total
            this.totalAmountPerMonth[month] += item.facture.total;
        }
    });

    this.initCharts();
}




  filterDocs() {
    let filteredDocs = this.Docs.filter(document => !document.etat);
    let filtereddocument = this.Docs.filter(document => document.etat);

    if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        filtereddocument = filtereddocument.filter(item => {
            const itemDate = new Date(item.dateTraitement);
            const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
            const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
            return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
        });

        filteredDocs = filteredDocs.filter(item => {
            const itemDate = new Date(item.dateAffectation);
            const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
            const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
            return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
        });
    }

    this.doctraite = filteredDocs.length;
    this.docnontraite = filtereddocument.length;

    this.initCharts();
}

initCharts() {
        const primaryColor = '#007bff';
        const secondaryColor = '#6c757d';
        const successColor = '#28a745';

        this.barData = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
                {
                    label: 'Total factures payés',
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                    data: this.totalAmountPerMonth,
                }
            ]
        };

        this.pieData = {
            labels: ['Dossier à traiter', 'Dossier traité'],
            datasets: [
                {
                    data: [this.doctraite,this.docnontraite],
                    backgroundColor: [
                        primaryColor,
                        successColor
                    ],
                    hoverBackgroundColor: [
                        `${primaryColor}80`,
                        `${secondaryColor}80`,
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: 'black'
                    }
                }
            }
        };

}


}
