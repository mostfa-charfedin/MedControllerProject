import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../models/doc';
import { User } from '../models/user';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';
import { Facture } from '../models/facture';
import { BordereauService } from '../services/bordereau.service';
import { Bordereau } from '../models/bordereau';
import { FactureService } from '../services/facture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-docs-fact',
  templateUrl: './list-docs-fact.component.html',
  styleUrl: './list-docs-fact.component.css'
})
export class ListDocsFactComponent {
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

    public router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loading = true;
    this.loadBordereaux();
    this.dataSource.paginator = this.paginator; // Connect data source to paginator
    if (this.paginator) { // Check if paginator exists
      this.paginator.pageSize = this.pageSize; // Set page size only if paginator is available
    } // Set initial page size (optional)


  }
  handlePageChange(event: any) {
    this.pageIndex = event.pageIndex; // Update current page
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize; // Update internal page size
      this.pageIndex = 0; // Reset to first page when size changes
    }
  }
  loadBordereaux(): void {
    this.bordereauService.getAllBordereaux().subscribe(
      (response :  Bordereau[] = []) => {

    this.loading = false;
    this.items= this.filteredItems = response.filter(Bordereau => Bordereau.paye ==false);
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
openBordereau(bordereau: Bordereau) {
  const base64Data = bordereau.bordereau;
  const url = "data:application/pdf;base64," + base64Data;
  const newWindow = window.open();
  newWindow!.document.body.innerHTML = '<iframe src="' + url + '" width="100%" height="100%"></iframe>';
}


payerFacture(bordereau: Bordereau) {
  let adminId = localStorage.getItem("id");
  this.bordereauService.PayeFacture(bordereau.id, Number(adminId)).subscribe(
    (response) => {
      console.log('Success: ', response);
window.location.reload();
      this.toastr.success('Facture payée avec succès!', 'Confirmation');
    },
    (error) => {
      console.error('Error: ', error);
      this.toastr.error('Erreur lors du paiement de la facture.', 'error');
    }
  );
}


}





