import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminLoginGuard } from './guards/adminLogin.guard';
import { AdminAddCategoryComponent } from './admin-home/admin-add-category/admin-add-category.component';
import { AdminMainComponent } from './admin-home/admin-main/admin-main.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminLoginGuard],
    children: [
      {
        path: 'home',
        component: AdminMainComponent,
        canActivate: [AdminLoginGuard]
      },
      {
        path: 'categories',
        component: AdminAddCategoryComponent
      }
    ]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
