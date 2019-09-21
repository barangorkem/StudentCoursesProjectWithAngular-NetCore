import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private _userService:UserService
    ){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if(localStorage.getItem("token")!=null)
   {
     debugger
    let role=next.data["roles"] as Array<string>;

    if(role!=null)
    {
     let isMatch:boolean = this._userService.roleMatch(role);
     if(isMatch)
       return true;
     else
      {
        alert('Yetkiniz yok');
        return false;
      }
    }
    else
    {
      return true;
    }
   }
    else
    {
      this.router.navigate(['']);
      return false;
    }
}
}