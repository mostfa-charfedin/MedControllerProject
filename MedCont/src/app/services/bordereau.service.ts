import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doc} from '../models/doc';
import jsPDF from 'jspdf';
import { AuthService } from './auth.service';
import { Bordereau } from '../models/bordereau';
@Injectable({
  providedIn: 'root'
})
export class BordereauService {

  constructor(private http: HttpClient ,
    private authService : AuthService) { }

  apiURL: string = 'http://localhost:8080/user';



  getAllBordereaux(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/allBordereaux`);
  }


  findBordereauByUserId(id: number){
    const url = `${this.apiURL}/findBordereauxByUserId/${id}`;

    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<any>(url,{headers : httpHeaders});
    }

  factureDocument(bordereau: File, facture: File, list: number[], userId: number, total : number) {
    const formData = new FormData();
    formData.append('file1', bordereau);
    formData.append('file2', facture);
    formData.append('list', JSON.stringify(list));
    formData.append('medecinId', userId.toString());
    formData.append('total', JSON.stringify(total));
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    const httpHeaders = new HttpHeaders({"Authorization": jwt});

    return this.http.post<any>(`${this.apiURL}/saveBoredereau`, formData, { headers: httpHeaders, responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }



  PayeFacture(borderauId: number, adminId: number){
    const formData = new FormData();
    formData.append('bordereauId', borderauId.toString());
    formData.append('adminId', adminId.toString());

    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    const httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.post<any>(this.apiURL + "/payerFacture", formData, { headers: httpHeaders, responseType: 'text' as 'json' })
    .pipe(
      catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse) {
  console.error('An error occurred:', error);
  return throwError('Error uploading files');
}
  }


