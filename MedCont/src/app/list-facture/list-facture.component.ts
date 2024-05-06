import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bordereau } from '../models/bordereau';
import { Facture } from '../models/facture';
import { User } from '../models/user';
import { BordereauService } from '../services/bordereau.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrl: './list-facture.component.css'
})
export class ListFactureComponent {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  searchText: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  items: Bordereau[] = [];
  filteredItems: Bordereau[] = [];
  loading : boolean = false;



  dataSource = new MatTableDataSource<User>();
  pageSize = 5; // Adjust the default page size as needed
  pageSizeOptions = [ 5, 10, 25, 50, 100];
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use `!` for non-null assertion


  constructor(
    private bordereauService: BordereauService,

    private userService: UserService,

    public router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loading = true;
    this.loadfactures();
    this.dataSource.paginator = this.paginator; // Connect data source to paginator
    if (this.paginator) { // Check if paginator exists
      this.paginator.pageSize = this.pageSize; // Set page size only if paginator is available
    }


  }
  handlePageChange(event: any) {
    this.pageIndex = event.pageIndex;
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = 0;
    }
  }

  loadfactures(){
    this.bordereauService.findBordereauByUserId(Number(localStorage.getItem('id'))).subscribe(
      (response :  Bordereau[] = []) => {
        this.loading = false;
        this.items= this.filteredItems = response;
        this.toastr.success('Facture importé avec succès', 'Confirmation');
          },
          (error) => {
        this.loading = false;
            console.error('Error fetching documents: ', error);
            this.toastr.error('erreur', 'error');
          }
        );
  }


  get filter() {
    if (!this.items) return [];

    let filteredItems = this.items;

    if (this.searchText === '') {
      filteredItems = this.items

    } else {
      filteredItems = this.items.filter((Doc) =>
        String(Doc.id) === this.searchText
      );

  }
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    filteredItems = filteredItems.filter(item => {
      const itemDate = new Date(item.dateTraitement);
      const itemDateWithoutTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
      const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      return itemDateWithoutTime >= startDateWithoutTime && itemDateWithoutTime <= endDateWithoutTime;
    });
    }
  return filteredItems;
  }



openFacture(facture: Facture) {
  const base64Data = facture.facture;
  const url = "data:application/pdf;base64," + base64Data;
  const newWindow = window.open();
  newWindow!.document.body.innerHTML = '<iframe src="' + url + '" width="100%" height="100%"></iframe>';
}





}






