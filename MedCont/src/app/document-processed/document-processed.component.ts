import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { ToastrService } from 'ngx-toastr';
import { Doc } from '../models/doc';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject
import { ToWords } from 'to-words';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-document-processed',
  templateUrl: './document-processed.component.html',
  styleUrl: './document-processed.component.css'
})
export class DocumentProcessedComponent implements OnInit{


  constructor( private userService: UserService,private documentService :DocumentService,
    private router:Router, private toastr: ToastrService) { }
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

    range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    total!: number;
    totalAmount!: string;
    prixttc!: string;
    searchText: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  items: Doc[] = [];
  filteredItems: Doc[] = [];
    loading : boolean = false;
    filterName:String ='';
    allSelectedDocuments: Doc[] = []; // New array to store all selections
    private selectedDocuments$ = new BehaviorSubject<Doc[]>([]); // BehaviorSubject for displayed selections

    dataSource = new MatTableDataSource<Doc>();
  pageSize = 3; // Adjust the default page size as needed
  pageSizeOptions = [3, 5, 10, 25];
  pageIndex = 0;
  user!: User;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use `!` for non-null assertion

  ngOnInit(): void {
    this.getDocuments();
    this.loading = true;
    this.dataSource.paginator = this.paginator; // Connect data source to paginator
    if (this.paginator) { // Check if paginator exists
      this.paginator.pageSize = this.pageSize; // Set page size only if paginator is available
    }
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

  }


  handlePageChange(event: any) {
    this.pageIndex = event.pageIndex; // Update current page
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize; // Update internal page size
      this.pageIndex = 0; // Reset to first page when size changes
      this.allSelectedDocuments = []; // Clear selections when page size changes (optional)
    }
    const displayedData = this.dataSource.data.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
    this.dataSource.data = displayedData; // Update displayed data with current page

    this.selectedDocuments$.next(this.allSelectedDocuments.filter(doc => displayedData.includes(doc))); // Update displayed selections
  }




  get filter() {
    if (!this.items) return [];

    let filteredItems = this.items;

    if (this.searchText === '') {
      filteredItems = this.items;

    } else {
      filteredItems = filteredItems.filter(item =>
        String(item.id) === this.searchText
      );
  }
  if (this.startDate && this.endDate) {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  filteredItems = filteredItems.filter(item => {
    const itemDate = new Date(item.dateAffectation);
    const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
    const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
  });
  }

  return filteredItems;
  }


  getDocuments() {
    let id = Number(localStorage.getItem('id'));
    this.documentService
      .getDocumentsByUSerId(id)
      .pipe(take(1))
      .subscribe({
        next: (res :  Doc[] = []) => {

          this.items= this.filteredItems= res.filter(document => document.etat == true);
          this.dataSource.data = this.items;
          this.loading = false;
          this.toastr.success('Documents loaded successfully', 'Confirmation');
        },
        error: (err: any) => {
          this.loading = false;
          if (err.error.errorCode === 'NO_DOCUMENT_TO_LOAD') {
            this.toastr.warning('NO DOCUMENT TO LOAD', 'Error');
          }
        }
      });
  }

detail(id: number): void {



        this.router.navigate([`/detailDocProc/${id}`]);

  }





  toggleSelection(event: Event, document: any) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    if (checked != null && document != null) {
      if (checked) {
        this.allSelectedDocuments.push(document);
      } else {
        this.allSelectedDocuments = this.allSelectedDocuments.filter(item => item !== document);
      }
      this.selectedDocuments$.next(this.allSelectedDocuments.filter(doc => this.dataSource.data.includes(doc))); // Update displayed selections

      console.log(this.allSelectedDocuments)
    }


  }


  calculeSomme(){
    this.total = this.allSelectedDocuments.reduce((total, document) => total + document.montant, 0);

    this.totalAmount=this.toWords.convert(this.total);
  }
  SommeTTC(){
    this.prixttc = this.toWords.convert(this.total + 1);
  }



}


