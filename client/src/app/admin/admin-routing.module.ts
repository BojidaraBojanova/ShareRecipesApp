import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginGuard } from './guards/adminLogin.guard';

const routes: Routes = [
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AdminLoginGuard]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
