import { Component } from "@angular/core";
import {FormGroup, FormControl} from '@angular/forms';
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
