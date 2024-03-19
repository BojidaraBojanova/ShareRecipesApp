import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, take, tap } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{

  private user$$ = new BehaviorSubject<User | undefined>(undefined);

  user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

 

  subscription: Subscription;

  constructor(private http: HttpClient) { 
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }

  login( email: string, password: string){
    const result = this.http.post<User>('http://localhost:3000/users/login', { email, password})
    .pipe(tap((user) => {

        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));

      }));    
    
    return result;
  }

  register( firstName: string, lastName: string, email: string, password: string, rePassword: string){
    const result = this.http.post<User>('http://localhost:3000/users/register', { firstName, lastName, email, password, rePassword}).pipe(
      tap((user) => {
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }));
 
    
    return result;
  }

  logout(){
    const result = this.http.get<User>('http://localhost:3000/users/logout', {}).pipe(
      tap(() =>{ 

        sessionStorage.removeItem(this.USER_KEY);
      
      }));
      
      return result;
  }

  getUser(): User | null {
    const userString = sessionStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  get isLogged(): boolean{
    return this.getUser() !== null;
  }


  // getProfile() {
  //   return this.http.get<User>('/profile').pipe(tap(user => this.user$$.next(this.user)))
  // }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
