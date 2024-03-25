import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
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

  getProfile(){
    return this.http.get<User>('http://localhost:3000/users/profile').pipe(
      tap((user) => this.user$$.next(user))
    );
  }

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

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
}
