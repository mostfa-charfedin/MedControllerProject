import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-demandeupdate',
  templateUrl: './demandeupdate.component.html',
  styleUrl: './demandeupdate.component.css'
})
export class DemandeupdateComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filterName: string = '';

  constructor(private userService: UserService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loadUsers();

    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.applyFilter(); // Apply filter after fetching users
      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  confirmValidation(user: User): void {
    const confirmValidation = window.confirm('Voulez-vous valider ?');
    if (confirmValidation) {console.log(user.id);
      this.userService.acceptDemande(user.id).subscribe(
        (updatedUser) => {
          console.log('User validation status updated successfully on the server');
          this.router.navigate(['demupdate']);
        },
        error => console.error('Error updating user validation status:', error)
      );
    }
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(user => !user.demandeMod);

  }
  filter() {
    if(this.filterName === ""){
      this.filteredUsers = this.users

    }
    else {


    this.filteredUsers = this.filteredUsers.filter((user) =>
      user.username.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }
}
}
