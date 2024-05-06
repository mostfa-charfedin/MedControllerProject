import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Historique } from '../models/historique';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  apiURL: string = 'http://localhost:8080/user';

  users! : User[];



  constructor(private http : HttpClient,
              private authService : AuthService) {


  }

  getAllUsers(): Observable<User[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

     return this.http.get<User[]>(this.apiURL+"/all",{headers:httpHeaders});

    }



  deleteUser(id : number) {
       const url = `${this.apiURL}/delete/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.delete(url,  {headers:httpHeaders});
        }
  bloquerUser(id : number) {
          const url = `${this.apiURL}/bloquer/${id}`;
           let jwt = this.authService.getToken();
           jwt = "Bearer "+jwt;
           let httpHeaders = new HttpHeaders({"Authorization":jwt})
             return this.http.delete(url,  {headers:httpHeaders});
           }
  validerUser(id : number) {
            const url = `${this.apiURL}/validerCompte/${id}`;
             let jwt = this.authService.getToken();
             jwt = "Bearer "+jwt;
             let httpHeaders = new HttpHeaders({"Authorization":jwt})
               return this.http.delete(url,  {headers:httpHeaders});
             }
   getUserById(id: number): Observable<User> {
          const url = `${this.apiURL}/getbyid/${id}`;

          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.get<User>(url,{headers:httpHeaders});
          }

  getByUsername(username: String): Observable<User> {
            const url = `${this.apiURL}/getbyUsername/${username}`;

            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
              return this.http.get<User>(url,{headers:httpHeaders});
            }


  recuperer(username: String): Observable<User> {
              const url = `${this.apiURL}/recuperer/${username}`;
                return this.http.get<User>(url);
              }


acceptDemande(id: number,adminId: number) {
  const formData = new FormData();
  formData.append('userId', id.toString());
  formData.append('adminId', adminId.toString());

                let jwt = this.authService.getToken();
                jwt = "Bearer " + jwt;
                const httpHeaders = new HttpHeaders({"Authorization": jwt});
                return this.http.put<String>(this.apiURL + "/acceptDm", formData, { headers: httpHeaders });
              }


demandeModificartion(id: number) {
                const data = { id: id }; // Create a JSON object with the id field
                let jwt = this.authService.getToken();
                jwt = "Bearer " + jwt;
                const httpHeaders = new HttpHeaders({"Authorization": jwt});
                return this.http.put<String>(this.apiURL + "/demande", data, { headers: httpHeaders });
              }

  updateUser(user :Partial<User>) : Observable<User>    {


          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return this.http.put<User>(this.apiURL+"/updateUser", user, {headers:httpHeaders});
          }

validatepassword(request:Partial<User>)    {
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
              return this.http.put<User>(this.apiURL+"/verif", request, {headers:httpHeaders});
            }

  updatePassword(user :User) : Observable<User>    {
              return this.http.put<User>(this.apiURL+"/updatePassword", user);
            }

  rechercherParSpecialite(specialite: string): Observable<User[]> {
          const url = `${this.apiURL}/usersBySpec/${specialite}`;
          return this.http.get<User[]>(url);
         }




  validateEmail(code : string){
      return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
      }



}
