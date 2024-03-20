import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AdminService } from "../admin.service";
import { Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate{
    
    constructor(private adminService: AdminService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.adminService.isLogged()){
            return true;
        }else{
            this.router.navigate(['/admin/login']);
            return false;
        }
    }


}