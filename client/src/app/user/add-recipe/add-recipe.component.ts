import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { Category } from 'src/app/types/category';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit{

  categories: Category[] = [];
  userId: string = '';

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private adminService: AdminService, private userService: UserService, private router: Router){}

  ngOnInit(): void {
      this.getUserId();
      this.loadCategory();
  }

  getUserId():void{
    const user = this.userService.getUser();
    if(user){
      this.userId = user._id
    }
  }

  loadCategory(): void {
    this.adminService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    )
  }

  addRecipe(): void{
    if(this.form.invalid){
      return;
    }

    const {title, description, ingredients, instructions, category, image} = this.form.value;

    this.userService.addRecipe(this.userId, title!, description!, ingredients!, instructions!, category!, image!).subscribe(()=>{
      this.router.navigate(['/category/recipes/' + category])
      console.log('Successful adding the recipe');
    })
  }
}
