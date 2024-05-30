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
selectedRoles: string[] = [];
selectedUser: any;

dataSource = new MatTableDataSource<User>();
pageSize = 5;
pageSizeOptions = [5, 10, 25];
pageIndex = 0;
@ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private toastr: ToastrService,public router: Router,) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loading = true;
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
  }
  handlePageChange(event: any) {
    this.pageIndex = event.pageIndex;
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = 0;
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

  /*deleteUser(user:User){
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
}*/


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
        }, 800);
      },
      (error) => {
        this.toastr.error('erreur.', 'Erreur');
      }
    );
  }
}

UpdateRoleUser(){
  const confirmValidation = window.confirm('Voulez-vous editer les roles ?');
  if (confirmValidation){
  this.userService.updateRole(this.selectedUser.id, this.selectedRoles).subscribe(
    (response) => {
      this.toastr.success('Role changé.', 'Confirmation');
      setTimeout(() => {
        window.location.reload();
      }, 800);
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
  openModal(user: any) {
    this.selectedUser = user || { roles: [] };
    this.selectedRoles = [...this.selectedUser?.roles.map((roleObj: any) => roleObj.role)]; // Extract roles to an array
    console.log(this.selectedUser?.roles);
  }

  updateRoles(event: any) {
    const role = event.target.value;
    if (event.target.checked) {
      // Add the role to the selectedRoles list if it is not already present
      if (!this.selectedRoles.includes(role)) {
        this.selectedRoles.push(role);
      }
    } else {
      // Remove the role from the selectedRoles list if unchecked
      const index = this.selectedRoles.indexOf(role);
      if (index !== -1) {
        this.selectedRoles?.splice(index, 1);
      }
    }
    console.log('Selected Roles:', this.selectedRoles);
  }

  isRoleSelected(role: string): boolean {
    return this.selectedUser?.roles.some((r: any) => r.role === role);
  }
  closeModal() {
    this.selectedUser = null;console.log(this.selectedUser)
  }




}
