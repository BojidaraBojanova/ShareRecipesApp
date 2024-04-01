import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Admin } from '../types/admin';
import { Category } from '../types/category';
import { Recipe } from '../types/recipe';
import { User } from '../types/user';

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

  addRecipe(ownerId: string, title: string, description: string, ingredients: string, instructions: string, category: string, image: string){
    const result = this.http.post<Recipe>('http://localhost:3000/admin/addRecipe', {ownerId, title, description, ingredients, instructions, category, image}).pipe(
      tap((recipe) => {
        console.log(recipe);
      })
    )
    return result;
  }

  createCategory( categoryName: string, image: string ){
    const result = this.http.post<Category>('http://localhost:3000/admin/categories', {categoryName, image})
    .pipe(tap((category: Category) => {
      console.log('Category is created', category);
    }))
    return result;
  }

  editCategory( categoryId: string, categoryName: string, image: string ){
    const result = this.http.put<Category>('http://localhost:3000/admin/editCategory/'+ categoryId, {categoryName, image})
    .pipe(tap((category: Category) => {
      console.log('Category is edited');
    }));
    return result;
  }

  getAllUsers(){
    const result = this.http.get<User[]>('http://localhost:3000/admin/users', {})
    .pipe(tap((users: User[]) => {
      console.log('Users is get')
    }));
    return result;
  }

  getAllCategories(){
    const result = this.http.get<Category[]>('http://localhost:3000/admin/categories', {})
    .pipe(tap((category: Category[]) => {
        console.log('Categories is get')
      }))
    return result;
  }

  deleteCategory( categoryId: string ){
    const result = this.http.delete<Category>('http://localhost:3000/admin/deleteCategory/'+categoryId,{})
    .pipe(tap((category: Category) => {
      console.log('Category is deleted');
    }))

    return result;
  }

  deleteUser( userId: string ){
    const result = this.http.delete<User>('http://localhost:3000/admin/deleteUser/'+userId, {})
    .pipe(tap((user: User) => {
      console.log('User is deleted')
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
