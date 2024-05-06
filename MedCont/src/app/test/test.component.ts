import { Component } from "@angular/core";
import {FormGroup, FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';


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
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
