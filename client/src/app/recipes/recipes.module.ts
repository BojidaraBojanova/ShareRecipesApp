import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { RecipesRoutingModule } from './recipes-routing.module';



@NgModule({
  declarations: [
    CategoryComponent
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
