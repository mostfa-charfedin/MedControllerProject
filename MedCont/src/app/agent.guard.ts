
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class agentGuard implements CanActivate {

  constructor (private authService: AuthService,
    private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (this.authService.isAgent())
      return true;
    else {
      this.router.navigate(['app-forbidden']);
      return false;
    }
  }

}
