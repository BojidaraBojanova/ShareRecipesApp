import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLoginComponent } from "./login/admin-login.component";
import { AdminNavbarComponent } from './admin-home/admin-navbar/admin-navbar.component';
import { AdminMainComponent } from './admin-home/admin-main/admin-main.component';
import { AdminAddCategoryComponent } from './admin-home/admin-add-category/admin-add-category.component';


@NgModule({
    declarations:[
        AdminLoginComponent,
        AdminNavbarComponent,
        AdminMainComponent,
        AdminAddCategoryComponent,
    ],
    imports:[
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
    ]
})

export class AdminModule { }