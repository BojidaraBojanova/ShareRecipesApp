import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe | undefined;
  isLoading: boolean = true;
  isFavorite: boolean = false;
  favorites: string[] = [];
  userId: string = '';

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private userService: UserService){}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const recipeId = params.get('recipeId');
        if(recipeId){
          this.recipeService.getRecipeDetails(recipeId).subscribe(recipe => {
            this.recipe = recipe;
            this.isLoading = false;
            this.getUserId();
          })
        }
      })


    // this.userService.getProfile().subscribe(user => {
    //   this.userId = user._id;
    //   this.favorites = user.favoriteRecipes;
    //   this.isFavorite = this.favorites.includes(this.recipe?._id ?? '')
    // });
  }

  getUserId(){
    const user = this.userService.getUser();
    if(user){
      this.userId = user._id;
      console.log('UserId:',this.userId)
      
      this.userService.getFavoriteRecipes(this.userId).subscribe(favorites => {
        this.favorites = favorites.map(recipe => recipe._id);
        console.log('RecipeId:',this.recipe?._id)
        console.log('FavoritesRecipes:', this.favorites)
        this.isFavorite = this.favorites.includes(this.recipe?._id ?? '');
        console.log('is favorite:', this.isFavorite)
      })
    }
  }

  toggleFavorite(): void{
    if(!this.isFavorite){
      this.userService.addFavoriteRecipe(this.userId, this.recipe?._id ?? '').subscribe(()=>{
        this.isFavorite = true;
      })
    }else{
        this.userService.removeFavoriteRecipe(this.userId, this.recipe?._id ?? '').subscribe(()=>{
          this.isFavorite = false;
        })
      }
    }
    // this.isFavorite = !this.isFavorite;
}

