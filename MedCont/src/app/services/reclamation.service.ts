import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from '../models/historique';
import { AuthService } from './auth.service';
import { Reclamation } from '../models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http : HttpClient,
    private authService : AuthService) {
}
apiURL: string = 'http://localhost:8080/user';

getAllReclamations(): Observable<Reclamation[]>{
   return this.http.get<Reclamation[]>(this.apiURL+"/allReclamations");
  }


  validerReclamation( id :number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<any>(`${this.apiURL}/validerReclamation/${id}`,{headers:httpHeaders});
   }

   addReclamation(reclamation :Reclamation,id:number){
    const formData = new FormData();
    formData.append('text', reclamation.text.toString());
    formData.append('object', reclamation.objet.toString());
    formData.append('userId', id.toString());

    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.post<Reclamation[]>(this.apiURL+"/sendReclamation",formData,{headers:httpHeaders, responseType: 'text' as 'json'});
       }
}
