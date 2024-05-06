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

   addReclamation(reclamation :Reclamation){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Reclamation[]>(this.apiURL+"/validerReclamation",{headers:httpHeaders});
       }
}
