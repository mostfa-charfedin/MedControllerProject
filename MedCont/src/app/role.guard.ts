import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { adminGuard } from './admin.guard';
import { agentGuard } from './agent.guard';
import { userGuard } from './user.guard';


@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is an admin, agent, or user
    if (this.authService.isAdmin() || this.authService.isAgent() || this.authService.isUser()) {
      return true;
    } else {
      // Redirect to unauthorized page or handle unauthorized access
      return   this.router.navigate(['app-forbidden']);
    }
  }
}
