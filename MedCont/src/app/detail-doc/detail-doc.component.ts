import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Doc } from '../models/doc';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { DataSenderService } from '../services/data-sender.service';


@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.component.html',
  styleUrls: ['./detail-doc.component.css'] // Corrected styleUrls
})
export class DetailDocComponent implements OnInit{

  ordenance: SafeResourceUrl | undefined;
  bulletin: SafeResourceUrl | undefined;
  document: Doc = new Doc();
  id: any;
  selectedUserId: string = '';
  searchText: string = '';
  doc: Doc = new Doc();

  fileNames: string[] = [''];
  file1: File | null = null;
  user!: User;
  data: any;


  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dataSender: DataSenderService,
  ) { }

  ngOnInit(): void {

console.log(this.data)
    let id =Number(localStorage.getItem('id'));
    this.userService.getUserById(id).subscribe({
    next:  (data: User) => {
        this.user = data;

      },
      error: (error :any )=> {
        console.error(error);
        alert('User Not Found');
      }
  });


    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.documentService.getDocumentById(this.id).subscribe(
      (response: any) => {
        this.document = response;
        this.ordenance = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + response.ordenance);
this.bulletin = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/PDF;base64,' + response.bulletin);

      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
  }

goto(){
  if(this.user.specialite==='dentiste'){
  this.router.navigate([`/RCdent/${this.document.id}`]);}
  if(this.user.specialite==='opticien'){
    this.router.navigate([`/RCopt/${this.document.id}`]);}
}

}
