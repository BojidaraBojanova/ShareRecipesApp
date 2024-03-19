import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAuthGuard } from './guards/adminAuth.guard';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
