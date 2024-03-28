import { Component, OnInit } from '@angular/core';
import { Recipe } from '../types/recipe';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
      this.loadLastThreeRecipes();
  }

  loadLastThreeRecipes(): void{
    this.recipeService.getLastThreeRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
      
    )
  }
}
