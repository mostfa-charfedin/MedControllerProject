import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demandeupdate',
  templateUrl: './demandeupdate.component.html',
  styleUrl: './demandeupdate.component.css'
})
export class DemandeupdateComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filterName: string = '';
  loading : boolean = false;



   // Pagination properties
   pageSize: number = 2; // Number of documents per page
   currentPage: number = 1; // Current page number
   totalPages: number = 1; // Total number of pages
   pages: number[] = []; // Array to store page numbers
  constructor(private userService: UserService, private toastr: ToastrService,public router: Router,) { }


  ngOnInit(): void {
    this.loadUsers();
    this.loading = true;

  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.loading = false;
        this.users = response;
        this.filteredUsers = this.users.filter(user => !user.demandeMod);
        this.calculatePagination()
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching users: ', error);
      }
    );
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
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

  filter() {
    if(this.filterName === ""){
      this.filteredUsers =  this.users.filter(user => !user.demandeMod);
      this.calculatePagination()
    }
    else {


    this.filteredUsers = this.filteredUsers.filter((user) =>
      user.username.toLowerCase().includes(this.filterName.toLowerCase())
    );
    this.calculatePagination()
  }
}
}

