import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

import {FormGroup, FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrl: './liste-users.component.css'
})
export class ListeUsersComponent implements OnInit {
  users: User[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

searchText: string = '';
startDate: Date | null = null;
endDate: Date | null = null;
items: User[] = [];
filteredItems: User[] = [];
loading : boolean = false;



dataSource = new MatTableDataSource<User>();
pageSize = 5; // Adjust the default page size as needed
pageSizeOptions = [5, 10, 25];
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
        this.users = response;
        this.items= this.filteredItems= this.users;

      },
      (error) => {
        this.loading = false;
        console.error('Error fetching users: ', error);
      }
    );
  }
  deleteUser(user:User){
    const confirmValidation = window.confirm('Voulez-vous supprimler le compte ?');
    if (confirmValidation){
    this.userService.deleteUser(user.id).subscribe(
      (response) => {
        this.toastr.success('Utilisateur supprimé.', 'Confirmation');
     


      },
      (error) => {
        this.toastr.error('erreur.', 'Erreur');

      }
    );
  }
}


  bloquerUser(user:User){
    const confirmValidation = window.confirm("Voulez-vous bloquer l'utilisateur ?");
    if (confirmValidation){
    this.userService.bloquerUser(user.id).subscribe(
      (response) => {
        this.toastr.success('Utilisateur bloqué.', 'Confirmation');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        this.toastr.error('erreur.', 'Erreur');
      }
    );
  }
}

  validerUser(user:User){
    const confirmValidation = window.confirm('Voulez-vous activer le compte ?');
    if (confirmValidation){
    this.userService.validerUser(user.id).subscribe(
      (response) => {
        this.toastr.success('Compte activé.', 'Confirmation');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        this.toastr.error('erreur.', 'Erreur');
      }
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
        user.username?.toLowerCase().includes(this.searchText.toLowerCase())
      );

  }
  return filteredItems;
  }






}
