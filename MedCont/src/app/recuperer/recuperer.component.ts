import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recuperer',
  templateUrl: './recuperer.component.html',
  styleUrl: './recuperer.component.css'
})
export class RecupererComponent implements OnInit{



  user!: User;
  usr: any;
  ok: any;
  isEditMode: boolean = true;
  confirmPassword?:string;
  myForm!: FormGroup;
  myForm2!: FormGroup;

  code:string="";
  username:string="";
  password:string="";
  err="";
  loading : boolean = false;



  constructor(
    public userService: UserService,  private authService : AuthService,private formBuilder: FormBuilder,
    public router: Router, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Initialize myForm with FormBuilder
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });

    // Initialize myForm2 with FormBuilder
    this.myForm2 = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  verifier() {

    this.loading = true;
    this.userService.recuperer(this.username).subscribe(
      (data) => {
        this.user = data;
        this.usr =1;
        this.isEditMode= false;
        this.toastr.success('Veuillez entrer le code envoyé par mail', 'Confirmation');
        console.log(this.user);
        this.loading = false;
      },
      (error) => {
        alert('Veuillez vérifier vos données');
      }
    );
  }

  verifyCode() {

    this.loading = true;
    this.userService.validateEmail(this.code).subscribe(
      (data) => {
         this.ok=1;

        this.toastr.success('Code is valid', 'Confirmation');
        this.toggleEditMode()
        this.loading = false;
      },
      (error) => {

        this.err = 'Invalid';
        console.log(error);
      }
    );
  }

  modifier() {


    this.loading = true;
    if (this.user.password !== '') {
      this.user.password = this.password;

      this.userService.updatePassword(this.user).subscribe(
        (data) => {

          this.toastr.success('Modification avec succès', 'Confirmation');
          this.router.navigate(['login']);
          this.isEditMode= true;
          this.loading = false;
        },
        (error) => {
          alert('Échec');
        }
      );
    } else {
      alert('Saisir tous les champs');
    }
  }
}
