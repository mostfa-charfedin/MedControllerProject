import { Injectable } from '@angular/core';
import { Doc } from '../models/doc';

@Injectable({
  providedIn: 'root'
})
export class DataSenderService {

  constructor() { }
  private listDoc!: Doc[];
  private sum!:number;
  private file!:File;
  setList(newData:Doc[]) {
    this.listDoc = newData;
  }

  getList() {
    return this.listDoc;
  }

  setSum(sum:number) {
    this.sum = sum;
  }

  getSum() {
    return this.sum;
  }

  setFile(file:File) {
    this.file = file;
  }

  getFile() {
    return this.file;
  }

}
