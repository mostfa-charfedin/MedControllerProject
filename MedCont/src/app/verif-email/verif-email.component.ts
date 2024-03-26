import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent implements OnInit {

  code:string="";
  user!:User;
  err="";

constructor(private route:ActivatedRoute,private authService:AuthService,
private router:Router
) {}


ngOnInit(): void {
      this.user =this.authService.regitredUser;
}



onValidateEmail() {
  this.authService.validateEmail(this.code).subscribe({
    next: (res) => {
      alert("Register successful");

          this.router.navigate(["/login"]);

    },
    error: (err: any) => {
    if ((err.error.errorCode == "INVALID_TOKEN"))
        this.err = "Votre code n'est pas valide !";

    if ((err.error.errorCode == "EXPIRED_TOKEN"))
        this.err = "Votre code a expiré !";


    },
  });






}

}
