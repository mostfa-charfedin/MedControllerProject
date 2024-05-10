import { Component } from "@angular/core";
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { User } from "../models/user";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../services/user.service";


export class DialogContentExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExample);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  
}
