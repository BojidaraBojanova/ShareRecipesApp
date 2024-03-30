import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { RecipesByCategoryComponent } from './recipes-by-category/recipes-by-category.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';


const routes: Routes = [

  {
    path: '',
    component: CategoryComponent
  },
  {
    path: 'recipes/:categoryId',
    component: RecipesByCategoryComponent
  },
  {
    path: 'recipe/details/:recipeId',
    component: RecipeDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
