import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe | undefined;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService){}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const recipeId = params.get('recipeId');
        if(recipeId){
          this.recipeService.getRecipeDetails(recipeId).subscribe(recipe => {
            this.recipe = recipe;
            this.isLoading = false;
            console.log(this.recipe)
          })
        }
      })
  }

}
