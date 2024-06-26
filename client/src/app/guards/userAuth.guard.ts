import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable({ providedIn: 'root' })
export class UserAuthGuard implements CanActivate{
    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isLogged = this.userService.isLogged;

        if(!isLogged){
            this.router.navigate(['/users/login']);
            return false;   
        }

        return true;
    }
} 