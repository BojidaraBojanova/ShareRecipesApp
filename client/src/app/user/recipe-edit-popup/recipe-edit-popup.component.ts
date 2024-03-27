import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/types/category';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-edit-popup',
  templateUrl: './recipe-edit-popup.component.html',
  styleUrls: ['./recipe-edit-popup.component.css']
})
export class RecipeEditPopupComponent implements OnInit{
  categories: Category[] = [];
  recipe: Recipe | undefined;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  })

  @Input() recipeId: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private adminService: AdminService, private recipeService: RecipeService, private route: ActivatedRoute){}

  ngOnInit(): void {
      this.loadCategory();

      this.route.paramMap.subscribe(params => {
        if(this.recipeId){
          this.recipeService.getRecipeDetails(this.recipeId).subscribe(recipe=>{
            this.recipe = recipe;
            this.populateForm(recipe);
          })
        }
      })
  }

  populateForm(recipe: Recipe): void{
    if(recipe){
      console.log(recipe)
      this.form.patchValue({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
        image: recipe.image
      });
    }
  }

  loadCategory():void{
    this.adminService.getAllCategories().subscribe((categories) =>{
      this.categories = categories;
    },
    (error) => {
      console.error('Error fetching categories:', error);
    })
  }
  

  edit(){}

  closePopup(){
    this.close.emit();    
  }
}
