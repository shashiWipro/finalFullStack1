import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../admin-service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {

  constructor(
    private router: Router,
    private adminService: AdminService
    ) { }

  public canActivate(): Observable<boolean> {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}