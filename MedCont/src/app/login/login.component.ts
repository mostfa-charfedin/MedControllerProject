import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {


  user = new User();
  err : number = 0;
  message : string ="login ou mot de passe erronés..";

  constructor(private authService : AuthService,private userService : UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
          this.router.navigate(['/']);
          this.getuser();

        },
        error: (err: any) => {
          this.err = 1;
          if (err && err.error && err.error.errorCause === "disabled") {
            this.message = "Le compte est désactivé !";
          }
          console.log("userrrrr", this.user);
          console.log("err", err);
        }
        });


    }


    getuser(){
      this.userService.getByUsername(this.authService.loggedUser).subscribe({
        next: (data) => {
          localStorage.setItem('id',data.id);
        },
        error: (err: any) => {
         console.log(err);
        },
      });
    }



}
