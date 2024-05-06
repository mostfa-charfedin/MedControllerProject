import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  apiURL: string = 'http://localhost:8080/user';

  getAllFactures(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/allFactures`);
  }


}
