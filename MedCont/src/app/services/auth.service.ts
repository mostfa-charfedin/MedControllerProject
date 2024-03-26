import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*  users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                   {"username":"nadhem","password":"123","roles":['USER']} ]; */

 private helper = new JwtHelperService();

apiURL: string = 'http://localhost:8080/user';
token!:string;

public loggedUser!:string;

public roles!:string[];

public regitredUser : User = new User();

  constructor(private router : Router,
              private http : HttpClient
) { }



setRegistredUser(user : User){
this.regitredUser=user;
}
getRegistredUser(){
return this.regitredUser;
}

  login(user : User)
  {
    console.log(user);
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
  }

 saveToken(jwt:string){
      localStorage.setItem('jwt',jwt);
      this.token = jwt;

      this.decodeJWT();
  }


  getToken():string {
    return this.token;
  }

  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }






  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  }


  logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;

  localStorage.clear();
  this.router.navigate(['/login']);
  }


  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);
  }


  registerUser(user :User){
    return this.http.post<User>(this.apiURL+'/register', user,
    {observe:'response'});
    }


    validateEmail(code : string){
      return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
      }

}
