import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(){
    const result = this.http.get<Recipe[]>('http://localhost:3000/admin/recipes', {})
    .pipe(tap((recipes: Recipe[]) => {
      console.log('Recipes is get')
    }))
    return result;
  }

  getRecipesByCategory(categoryId: string): Observable<Recipe[]>{
    const result = this.http.get<Recipe[]>('http://localhost:3000/category/recipes/'+categoryId);
    return result;
  }

  getRecipeDetails(recipeId: string): Observable<Recipe>{
    const result = this.http.get<Recipe>('http://localhost:3000/category/recipe/details/'+recipeId);
    return result;
  }

  getLastThreeRecipes(): Observable<Recipe[]> {
    const result = this.http.get<Recipe[]>('http://localhost:3000/home/last-three-recipes');
    return result;
  }

  getUserRecipes(userId: string): Observable<Recipe[]>{
    const result = this.http.get<Recipe[]>('http://localhost:3000/users/'+ userId +'/recipes');
    return result;
  }

  editRecipe(recipeId: string, title: string, description: string, ingredients: string, instructions: string, category: string, image: string){
    const result = this.http.put<Recipe>('http://localhost:3000/users/recipe/edit/' + recipeId, {title, description, ingredients, instructions, category, image})
    .pipe(tap((recipe: Recipe) => {
      console.log('Recipe is edited', recipe);
    }))

    return result;
  }

  deleteRecipe(recipeId: string){
    const result = this.http.delete<Recipe>('http://localhost:3000/users/recipe/delete/' + recipeId, {})
    .pipe(tap((recipe: Recipe) => {
      console.log('Recipe is deleted');
    }))

    return result;
  }
}
