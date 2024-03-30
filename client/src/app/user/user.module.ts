import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditPopupComponent } from './profile-edit-popup/profile-edit-popup.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeEditPopupComponent } from './recipe-edit-popup/recipe-edit-popup.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditPopupComponent,
    AddRecipeComponent,
    RecipeEditPopupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
