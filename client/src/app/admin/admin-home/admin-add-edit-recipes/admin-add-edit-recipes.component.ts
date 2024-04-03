import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Recipe } from 'src/app/types/recipe';
import { AdminService } from '../../admin.service';
import { Category } from 'src/app/types/category';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-admin-add-edit-recipes',
  templateUrl: './admin-add-edit-recipes.component.html',
  styleUrls: ['./admin-add-edit-recipes.component.css']
})
export class AdminAddEditRecipesComponent implements OnInit{
  
  categories: Category[] = [];
  recipes: Recipe[] = [];
  recipeData: Recipe = {_id: '', title: '', description: '', ingredients: '', instructions: '', category: '', image: '', ownerId: ''};
  isEditMode: boolean = false;
  recipeId: string = '';
  ownerId: string = '';

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private adminService: AdminService, private recipeService: RecipeService, private userService: UserService){}

  ngOnInit(): void {
      this.loadCategories();
      this.loadRecipes();
      this.getOwnerId();
  }

  getOwnerId(): void{
    const admin = this.adminService.getAdmin();
    if(admin){
      this.ownerId = admin._id;
    }
  }

  addOrEditRecipe(){
    const { title, description, ingredients, instructions, category, image } = this.form.value;

    if(this.isEditMode){
      this.recipeService.editRecipe(this.recipeId, title!, description!, ingredients!, instructions!, category!, image!).subscribe(() => {
        this.clearFormAndReload();
      })
    }else{
      this.adminService.addRecipe(this.ownerId, title!, description!, ingredients!, instructions!, category!, image!).subscribe(()=>{
        this.clearFormAndReload()
      })
    }
  }

  editRecipe(recipe: Recipe){
    window.scrollTo(0, 0);
    this.form.patchValue({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      category: recipe.category,
      image: recipe.image
    });

    this.isEditMode = true;
    this.recipeId = recipe._id;
  }

  deleteRecipe(recipeId: string){
    window.scrollTo(0, 0);
    this.recipeService.deleteRecipe(recipeId).subscribe(() => {
      this.userService.removeFavoriteRecipeForAllUsers(recipeId).subscribe(() => {
        this.clearFormAndReload();
      });
    })
  }

  clearFormAndReload(): void{
    this.form.reset();
    this.isEditMode = false;
    this.loadRecipes();
  }

  loadCategories(): void{
    this.adminService.getAllCategories().subscribe(
      (data: Category[]) =>{
        this.categories = data
      }
    )
  }

  loadRecipes(): void{
    this.recipeService.getAllRecipes().subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }
    )
  }
}
