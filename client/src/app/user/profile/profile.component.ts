import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileDetails, User } from 'src/app/types/user';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profileDetails: ProfileDetails = {
    firstName: '',
    lastName: '',
    email: ''
  };

  recipes: Recipe[] = [];
  favoriteRecipe: Recipe[] = [];
  recipeId: string = '';

  isPopupVisible: boolean = false;
  isEditRecipePopupVisible: boolean = false;
  
  constructor(private userService: UserService, private recipeService: RecipeService){}


  @Output() editRecipeClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
      
    this.userService.user$.subscribe(user => {
      if(user){
       this.showProfileDetails(user);
       this.getUserRecipes(user._id)
      }else{
        const storedUser = this.userService.getUser();

        if(storedUser){
          this.showProfileDetails(storedUser);
          this.getUserRecipes(storedUser._id);
          this.getUserFavoriteRecipes(storedUser._id)
        }else{
          this.profileDetails = {
            firstName: '',
            lastName: '',
            email: ''
          }
        }
      }
    })  
  }

  getUserRecipes(userId: string){
    this.recipeService.getUserRecipes(userId).subscribe(recipes => {
      return this.recipes = recipes
    })
  }

  getUserFavoriteRecipes(userId: string){
    this.userService.getFavoriteRecipes(userId).subscribe(recipes => {
      return this.favoriteRecipe = recipes;
    })
  }
 
  showProfileDetails(user: User):void{
    const{ firstName, lastName, email } = user;
    this.profileDetails = {
      firstName, 
      lastName,
      email
    }
  }

  showEditRecipePopup(recipeId: string){
    this.isEditRecipePopupVisible  = true;
    this.recipeId = recipeId;
    console.log(recipeId)
    //this.editRecipeClicked.emit(recipeId);
    console.log(this.isEditRecipePopupVisible)
  }

  hideEditRecipePopup(){
    this.isEditRecipePopupVisible  = false;
  }

  showPopup(){
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false
  }

  deleteRecipe(recipeId: string){
    this.recipeService.deleteRecipe(recipeId).subscribe(()=>{
      window.location.reload();
    })
  }
}
