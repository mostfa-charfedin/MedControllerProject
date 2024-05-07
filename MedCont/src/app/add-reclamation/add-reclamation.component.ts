import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Doc } from '../models/doc';
import { DataSenderService } from '../services/data-sender.service';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';
import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrl: './add-reclamation.component.css'
})
export class AddReclamationComponent implements OnInit {

  constructor( private userService: UserService,private reclamationService :ReclamationService  ,private formBuilder: FormBuilder,
    private router:Router, private toastr: ToastrService,) { }



reclamation = new Reclamation();
 formReclamtion!: FormGroup;


  ngOnInit(): void {
    this.formReclamtion = this.formBuilder.group({
      objet: ['', [Validators.required]],
      text: ['', [Validators.required]],
    })
  }

    sendReclamation() {

      this.reclamation = this.formReclamtion.value;
      this.reclamationService
        .addReclamation(this.reclamation,Number(localStorage.getItem('id')))
        .subscribe({
          next: (res) => {
            this.toastr.success('Reclamation envoyé', 'Confirmation');
          },
          error: (err: any) => {
              this.toastr.warning('Erreur', 'Error');
          }
        });
    }
}
