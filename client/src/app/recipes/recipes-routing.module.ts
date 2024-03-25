import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { RecipesByCategoryComponent } from './recipes-by-category/recipes-by-category.component';


const routes: Routes = [

  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'category/recipes/:categoryId',
    component: RecipesByCategoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
