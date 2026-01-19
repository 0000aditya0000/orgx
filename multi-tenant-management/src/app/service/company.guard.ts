import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard  {
  constructor(private router:Router , private loginService:LoginService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Check if the user has a role of 'super admin', 'admin', or 'employee'
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return this.router.navigate(['/login']);
      }

      const expireIn: Date = new Date(this.loginService.parseJwt(token).exp * 1000);
      const currentTime: Date = new Date();
      this.loginService.expireTime = expireIn.getTime() - currentTime.getTime();
      this.loginService.setIntervalForRefresh();
      if(localStorage.getItem('role')==='super admin' ||localStorage.getItem('role')==='admin'  || localStorage.getItem('role')==='employee'){
        return true;
      }else{
        return this.router.navigate(['/login'])
      }  
    }

}
