import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'I-MedController';
  selectedRoute!: string;
  currentRoute!: string;
  routes: string[] = [];

  constructor(public authService: AuthService,
              private router :Router){

                this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    this.selectedRoute = event.url;
                  }
                });

                this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    this.currentRoute = this.getCurrentRoute();
                  }
                });
                this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    this.updateBreadcrumb();
                  }
                });
              }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.authService.logout();

          }
  }

  onLogout(){
    this.authService.logout();
  }
  getCurrentRoute(): string {
    // Get the current route from the router
    // You may need to customize this logic based on your routing setup
    return this.router.url;
  }

  updateBreadcrumb(): void {
    // Clear the existing routes array
    this.routes = [];

    // Get the current route's navigation tree
    let currentRoute: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    while (currentRoute) {
      const routeData = currentRoute.data;
      if (routeData && routeData['breadcrumb']) { // Adjusted access to breadcrumb property
        // If the route has a breadcrumb data property, add it to the routes array
        this.routes.unshift(routeData['breadcrumb']); // Adjusted access to breadcrumb property
      }
      currentRoute = currentRoute.firstChild;
    }
  }
  isSelected(route: string): boolean {
    return this.selectedRoute === route;
  }
}
