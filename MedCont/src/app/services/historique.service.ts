import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Historique } from '../models/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(private http : HttpClient,
    private authService : AuthService) {
}
apiURL: string = 'http://localhost:8080/user';

getAllHistorys(): Observable<Historique[]>{


   return this.http.get<Historique[]>(this.apiURL+"/allHistorys");

  }


}
