import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchRecipes(title: string): Observable<Recipe[]>{
    const query = title ? `?q=${title}` : '';
    return this.http.get<Recipe[]>('http://localhost:3000/search/' + query);
  }
}
