import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { BordereauService } from '../services/bordereau.service';
import { Bordereau } from '../models/bordereau';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  request :Partial<User> = {};
  isEditMode: boolean =true;
  isSwitched: boolean =false;
  isSwitched2: boolean =false;

  myForm2!: FormGroup;
  confirmPassword?:string;
  password:string="";
  err="";
  loading : boolean = false;
  profileImage: string = 'assets/images/logo.png'; // Chemin de l'image par défaut
  file1: File | null = null;
  photo!: File;
  fileNames: string[] = ['', ''];
  constructor(

    private userService: UserService
    ,private formBuilder: FormBuilder,
    public authService: AuthService,
     private toastr: ToastrService) {}

  ngOnInit() {
      let id =Number(localStorage.getItem('id'));
      this.userService.getUserById(id).subscribe({
      next:  (data: User) => {
          this.user = data; 
          if (this.user.photo) {
            this.profileImage ='data:image/jpeg;base64,'+this.user.photo;
          }

        },
        error: (error :any )=> {
          console.error(error);
          alert('User Not Found');
        }
  });
 // Initialize myForm2 with FormBuilder
 this.myForm2 = this.formBuilder.group({
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required]],
});
  }

  switch(){
    this.isEditMode =false;
    this.isSwitched =true;
  }
  switch2(formProfile: NgForm){
    this.isSwitched =false;
    this.isSwitched2 =true;
    this.user.firstName = formProfile.value['firstName'];
    this.user.lastName = formProfile.value['lastName'];
    this.user.email = formProfile.value['email'];
    this.user.specialite = formProfile.value['specialite'];
    this.user.localisation = formProfile.value['localisation'];
    this.user.tel = formProfile.value['tel'];
    this.user.matricule = formProfile.value['matricule'];
    this.user.birthday = formProfile.value['birthday'];
    this.user.cin = formProfile.value['cin'];

  }
  demandemodification(){
    this.userService.demandeModificartion(this.user.id).subscribe({
      next: (data) => {
        this.toastr.success('Demande envoyée', 'Confirmation');
},
      error: (err) => {
        this.toastr.error('Erreur', 'Erreur');
            console.log("err",err);
      }
      });
 }



   verifpassword() {
    this.request.username =this.user.username;
    this.request.password =this.password;
this.user.photo = this.removeBase64Prefix(this.profileImage);
    this.userService.validatepassword(this.request).subscribe({
        next: (data) => {
          this.isSwitched =false;
this.userService.updateUser(this.user).subscribe({
  next: (data) => {
this.user=data;
this.toastr.success('Pasword valide, Profile updated', 'Confirmation');
setTimeout(() => {
  window.location.reload();
}, 800);
this.isEditMode =true;
this.isSwitched=false;
this.isSwitched2 =false;
this.confirmPassword="";
this.password="";
  },
  error: (err: any) => {
    console.log("err", err);
    alert("errrrrrrr")
  }
  });

        },
        error: (err) => {
          this.toastr.error(' Invalide Paswword', 'Erreur');
              console.log("err",err);
        }
        });
   }

   onImageChange(event: any) {
     this.photo = event.target.files[0]; // Récupérer le fichier sélectionné
    if (this.photo) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profileImage = e.target.result;console.log(this.profileImage)
      };
      reader.readAsDataURL(this.photo);
    }
  }

removeBase64Prefix(encodedString: string): string {
    const prefix = "data:image/jpeg;base64,";
    if (encodedString.startsWith(prefix)) {
        return encodedString.substring(prefix.length);
    } else {

        return encodedString;
    }
}

 }


