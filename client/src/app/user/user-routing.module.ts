import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { UserAuthActivate } from '../guards/userAuth.activate';

const routes: Routes = [
  {
    path: 'users/login',
    component: LoginComponent,
    canActivate: [!UserAuthActivate]
    
  },
  {
    path: 'users/register',
    component: RegisterComponent,
    canActivate: [!UserAuthActivate]

    
  },
  {
    path: 'users/profile',
    component: ProfileComponent,
    canActivate: [UserAuthActivate]
    
  },
  {
    path: 'users/addRecipe',
    component: AddRecipeComponent,
    canActivate: [UserAuthActivate]
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
