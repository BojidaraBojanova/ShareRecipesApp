import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminLoginGuard } from './guards/adminLogin.guard';
import { AdminAddEditCategoryComponent } from './admin-home/admin-add-edit-category/admin-add-edit-category.component';
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
        component: AdminAddEditCategoryComponent
      },

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
