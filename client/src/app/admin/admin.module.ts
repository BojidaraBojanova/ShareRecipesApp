import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLoginComponent } from "./login/admin-login.component";
import { AdminNavbarComponent } from './admin-home/admin-navbar/admin-navbar.component';
import { AdminMainComponent } from './admin-home/admin-main/admin-main.component';
import { AdminAddEditCategoryComponent } from './admin-home/admin-add-edit-category/admin-add-edit-category.component';
import { AdminAddEditRecipesComponent } from './admin-home/admin-add-edit-recipes/admin-add-edit-recipes.component';


@NgModule({
    declarations:[
        AdminLoginComponent,
        AdminNavbarComponent,
        AdminMainComponent,
        AdminAddEditCategoryComponent,
        AdminAddEditRecipesComponent,
    ],
    imports:[
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
    ]
})

export class AdminModule { }