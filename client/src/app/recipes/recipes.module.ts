import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesByCategoryComponent } from './recipes-by-category/recipes-by-category.component';



@NgModule({
  declarations: [
    CategoryComponent,
    RecipesByCategoryComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  exports: [
    CategoryComponent,
    
  ]
})
export class RecipesModule { }
