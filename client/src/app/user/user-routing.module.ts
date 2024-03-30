import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { UserAuthGuard } from '../guards/userAuth.guard';
import { InverseUserAuthGuard } from '../guards/inverseUserAuth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [InverseUserAuthGuard]
    
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [InverseUserAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserAuthGuard]
    
  },
  {
    path: 'addRecipe',
    component: AddRecipeComponent,
    canActivate: [UserAuthGuard]
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
