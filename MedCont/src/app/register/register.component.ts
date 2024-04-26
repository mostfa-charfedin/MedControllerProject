import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

public user = new User();

confirmPassword?:string;

myForm!: FormGroup;

err="";
loading : boolean = false;

constructor(private formBuilder: FormBuilder,  private authService : AuthService,
  private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      specialite: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      localisation: ['', [Validators.required]],
      matricule: ['', [Validators.required]],
      tel: ['', [Validators.required, ]],
      birthday: ['', [Validators.required,]],
      cin: ['', [Validators.required,]],
    });

  }

  onRegister() {
    if (this.myForm.invalid) {
      return;
    }

    this.loading = true;
    // Populate the user object with form values
    this.user = this.myForm.value;
console.log(this.myForm.value)
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        this.loading = false;
        this.toastr.success('Veillez confirmer votre email', 'Confirmation');
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        if (err.error.errorCode === 'USER_EMAIL_ALREADY_EXISTS') {
          this.err = 'Email already used';
        } else if (err.error.errorCode === 'USER_USERNAME_ALREADY_EXISTS') {
          this.err = 'Username already used';
        } else {
          this.err = 'An error occurred during registration';
        }
        this.loading = false;
      },
    });
  }



}
