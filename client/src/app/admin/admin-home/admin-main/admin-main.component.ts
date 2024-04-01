import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { count } from 'rxjs';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit{

  name: string = '';
  userCount: number = 0;
  categoriesCount: number = 0;
  recipesCount: number = 0;

  constructor(private adminService: AdminService, private recipeService: RecipeService){}

  ngOnInit(): void {
      const admin = this.adminService.getAdmin();
      this.name = admin ? admin.username : '';

      this.adminService.getUserCount().subscribe(count => {
        this.userCount = count;
      })

      this.adminService.getCategoriesCount().subscribe(count => {
        this.categoriesCount = count;
      })

      this.recipeService.getRecipesCount().subscribe(count => {
        this.recipesCount = count;
      })
  }

  
}
