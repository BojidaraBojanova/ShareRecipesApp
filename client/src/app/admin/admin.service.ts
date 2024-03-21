import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Admin } from '../types/admin';
import { Category } from '../types/category';

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

  createCategory( categoryName: string, image: string){
    const result = this.http.post<Category>('http://localhost:3000/admin/categories', {categoryName, image})
    .pipe(tap((category: Category) => {
      console.log('Category is created', category);
    }))
    console.log(result);
    return result;
  }

  getAllCategories(){
    const result = this.http.get<Category[]>('http://localhost:3000/admin/categories', {})
    .pipe(tap((category: Category[]) => {
        console.log('Categories is get', category)
      }))
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

  // getAdminId(): string | null {
  //   const admin = this.getAdmin();
  //   if(admin && admin._id){
  //     console.log(admin._id);
  //     return admin._id;
  //   }
  //   return null;
  // }

  isLogged(): boolean{
    return this.getAdmin() !== null;
  }

}
