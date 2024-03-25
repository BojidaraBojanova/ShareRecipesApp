import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipesByCategory(categoryId: string): Observable<Recipe[]>{
    const result = this.http.get<Recipe[]>('http://localhost:3000/category/recipes/'+categoryId);
    return result;
  }
}
