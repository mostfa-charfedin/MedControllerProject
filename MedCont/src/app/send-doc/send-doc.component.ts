import { Component } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Doc } from '../models/doc';
import { FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-send-doc',
  templateUrl: './send-doc.component.html',
  styleUrl: './send-doc.component.css'
})
export class SendDocComponent {

  fileNames: string[] = ['', ''];
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUserId: string = '';
  searchText: string = '';
 doc: Doc = new Doc();
 file1: File | null = null;
 file2: File | null = null;
 agentId: number = 1; // Sample agent ID
 medecinId: number = 1; // Sample medecin ID
 myForm!: FormGroup;
  formBuilder: any;
  constructor(
    private fileUploadService: DocumentService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchUsers();



  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: (err: any) => {
        console.log('Error fetching users:', err);
      }
    });
  }

  onFileSelected(event: any, index: any): void {
    const file = event.target.files[0];
    this.fileNames[index - 1] = file ? file.name : '';
  }

  onSelect(event: any) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    if (selectedValue) {
      this.selectedUserId = selectedValue;
      console.log('Selected user ID:', this.selectedUserId);
    }
  }





  uploadFiles(sendDoc: NgForm): void {
    const file1Input = document.getElementById('inputGroupFile01') as HTMLInputElement;
    const file2Input = document.getElementById('inputGroupFile02') as HTMLInputElement;

    // Check if files are selected
    if (!file1Input || !file2Input || !file1Input.files || !file2Input.files) {
      console.error('Please select both files.');
      return;
    }

    const file1 = file1Input.files[0];
    const file2 = file2Input.files[0];

    if (!file1 || !file2) {
      console.error('Please select both files.');
      return;
    }
this.doc.agentId=  localStorage.getItem('id');
this.doc.medecinId =  this.selectedUserId;

this.doc.matriculeAssure = sendDoc.value['matriculeAssure'];
this.doc.nomAssure = sendDoc.value['nomAssure'];
this.doc.nomBenificiaire = sendDoc.value['nomBenificiaire'];
this.doc.qualiteBinificiaire = sendDoc.value['QualiteBinificiaire'];
console.log(this.doc)
    this.fileUploadService.uploadFiles(this.doc, file1, file2).subscribe({
      next: (res) => {
        console.log('Files uploaded successfully:', res);
        this.toastr.success('Document envoyée', 'Confirmation');
        // Handle success response
      },
      error: (err) => {
        console.error('Error uploading files:', err);
        alert("erreur");
        // Handle error
      }
    });
  }

  onFile1Selected(event: any) {
    this.file1 = event.target.files[0];
  }

  onFile2Selected(event: any) {
    this.file2 = event.target.files[0];
  }




  filterUsers() {
    if (this.searchText.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchText.toLowerCase())
      );

      // Stop filtering if only one user matches the search
      if (this.filteredUsers.length === 1) {
        return;
      }
    }
  }
}

