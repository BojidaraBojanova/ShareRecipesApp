import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-by-category',
  templateUrl: './recipes-by-category.component.html',
  styleUrls: ['./recipes-by-category.component.css']
})
export class RecipesByCategoryComponent implements OnInit{
  recipes: Recipe[] = [];
  isLoading: boolean = true;

  constructor( private route: ActivatedRoute, private recipeService: RecipeService){}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const categoryId = params.get('categoryId');
        if(categoryId){
          this.recipeService.getRecipesByCategory(categoryId).subscribe(recipes => {
            this.recipes = recipes;
            this.isLoading = false;
            console.log('recipes:', recipes)
          })
        }
        
      })
  }
}
