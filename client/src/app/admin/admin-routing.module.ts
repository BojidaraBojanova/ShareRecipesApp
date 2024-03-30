import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminAuthGuard } from './guards/adminAuth.guard';
import { AdminAddEditCategoryComponent } from './admin-home/admin-add-edit-category/admin-add-edit-category.component';
import { AdminMainComponent } from './admin-home/admin-main/admin-main.component';
import { InverseAuthGuard } from './guards/inverseAuth.guard';

const routes: Routes = [
  // {
  //   path: 'admin',
  //   canActivate: [AdminLoginGuard],
  //   children: [
  //     {
  //       path: 'home',
  //       component: AdminMainComponent,
  //       canActivate: [AdminLoginGuard]
  //     },
  //     {
  //       path: 'categories',
  //       component: AdminAddEditCategoryComponent,
        
  //     },

  //   ]
  // },
  {
    path: 'home',
    component: AdminMainComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'categories',
    component: AdminAddEditCategoryComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'login',
    component: AdminLoginComponent,
    canActivate: [InverseAuthGuard]
  },
  

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
