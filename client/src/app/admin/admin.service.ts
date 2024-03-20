import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Admin } from '../types/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private admin$$ = new BehaviorSubject<Admin | undefined>(undefined);

  admin$ = this.admin$$.asObservable();

  admin: Admin | undefined;
  ADMIN_KEY = '[admin]';

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.admin$.subscribe(admin => {
      this.admin = admin;
    })
   }

  login( username: string, password: string){
    const result = this.http.post<Admin>('http://localhost:3000/admin/login', {username, password})
    .pipe(tap((admin) => {
      sessionStorage.setItem(this.ADMIN_KEY, JSON.stringify(admin));
    }));

    return result;
  }

  logout(){
    const result = this.http.get<Admin>('http://localhost:3000/admin/logout', {}).pipe(
      tap(() => {
        sessionStorage.removeItem(this.ADMIN_KEY);
      })
    )
    return result;
  }


  getAdmin(): Admin | null {
    const adminString = sessionStorage.getItem(this.ADMIN_KEY);
    return adminString ? JSON.parse(adminString) : null;
  }

  isLogged(): boolean{
    return this.getAdmin() !== null;
  }

}
