import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesByCategoryComponent } from './recipes-by-category/recipes-by-category.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CategoryComponent,
    RecipesByCategoryComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ],
  exports: [
    CategoryComponent,
    
  ]
})
export class RecipesModule { }
