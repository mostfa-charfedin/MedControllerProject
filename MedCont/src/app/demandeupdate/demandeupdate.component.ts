import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

import {FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-demandeupdate',
  templateUrl: './demandeupdate.component.html',
  styleUrl: './demandeupdate.component.css'
})
export class DemandeupdateComponent implements OnInit {
  searchText: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  items: User[] = [];
  filteredItems: User[] = [];
  loading : boolean = false;



  dataSource = new MatTableDataSource<User>();
  pageSize = 3; // Adjust the default page size as needed
  pageSizeOptions = [3, 5, 10, 25];
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use `!` for non-null assertion
  constructor(private userService: UserService, private toastr: ToastrService,public router: Router,) { }


  ngOnInit(): void {
    this.loadUsers();
    this.loading = true;
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


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.loading = false;
        this.items= this.filteredItems= response.filter(user => !user.demandeMod);
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching users: ', error);
      }
    );
  }




  confirmValidation(user: User): void {
    const confirmValidation = window.confirm('Voulez-vous valider ?');
    if (confirmValidation) {console.log(user.id);
      this.userService.acceptDemande(user.id).subscribe(
        (data) => {
          this.toastr.success('User validation status updated successfull', 'Confirmation');
          console.log('User validation status updated successfully on the server');
          this.loadUsers();
        },

        error =>{console.error('Error updating user validation status:', error);
         this.toastr.error('Error updating user validation status', 'Error');}
      );
    }
  }


get filter() {
  if (!this.items) return [];

  let filteredItems = this.items;

  if (this.searchText === '') {
    filteredItems = this.items

  } else {
    filteredItems = this.items.filter((user) =>
      user.username.toLowerCase().includes(this.searchText.toLowerCase())
    );

}
return filteredItems;
}
}

