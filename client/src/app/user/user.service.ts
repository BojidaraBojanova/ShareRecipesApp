import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{

  private user$$ = new BehaviorSubject<User | undefined>(undefined);

  user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged():boolean {
    return this.getUser() !== null;
  }

  constructor(private http: HttpClient) { 
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }


  login( email: string, password: string){
    const result = this.http.post<User>('http://localhost:3000/users/login', { email, password})
    .pipe(tap((user) => {
      console.log('User:',user);
      this.user$$.next(user);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }));    

    return result;
  }


  register( firstName: string, lastName: string, email: string, password: string, rePassword: string){
    const result = this.http.post<User>('http://localhost:3000/users/register', { firstName, lastName, email, password, rePassword}).pipe(
      tap((user) => {
        this.user$$.next(user)
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }));
    
    return result;
  }

  logout(){
    return this.http.get('http://localhost:3000/users/logout', {}).pipe(
      tap(() => {
        sessionStorage.removeItem(this.USER_KEY);
        this.user$$.next(undefined);
      }));      
  }

  // getProfile(){
  //   return this.http.get<User>('http://localhost:3000/users/profile').pipe(
  //     tap((user) => this.user$$.next(user))
  //   );
  // }

  getUser(): User | null {
    const userString = sessionStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  editUser(userId: string, firstName: string, lastName: string, email: string, password: string, rePassword: string){
    sessionStorage.removeItem(this.USER_KEY);
    const result = this.http.put<User>('http://localhost:3000/users/profile/edit/' + userId, {firstName, lastName, email, password, rePassword})
    .pipe(tap((user: User) => {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      console.log('User is edited', user);
    }));

    return result;
  }

  addRecipe(userId: string, title: string, description: string, ingredients: string, instructions: string, category: string, image: string){
    const result = this.http.post<Recipe>('http://localhost:3000/users/addRecipe', {userId, title, description, ingredients, instructions, category, image}).pipe(
      tap((recipe) => {
        console.log(recipe);
      })
    )
    return result;
  }

  addFavoriteRecipe(userId: string, recipeId: string): Observable<User>{
    return this.http.post<User>('http://localhost:3000/users/' + userId + '/favorite/' + recipeId, {});
  }

  removeFavoriteRecipe(userId: string, recipeId: string): Observable<User> {
    return this.http.delete<User>('http://localhost:3000/users/' + userId + '/favorite/' + recipeId);
  }

  removeFavoriteRecipeForAllUsers(recipeId: string): Observable<void>{
    return this.http.delete<void>('http://localhost:3000/users/favorite/' + recipeId);
  }

  getFavoriteRecipes(userId: string){
    return this.http.get<Recipe[]>('http://localhost:3000/users/favorite-recipes/' + userId);
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
}
