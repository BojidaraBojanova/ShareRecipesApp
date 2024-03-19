import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLoginComponent } from "./login/admin-login.component";
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin-home/admin-navbar/admin-navbar.component';
import { AdminMainComponent } from './admin-home/admin-main/admin-main.component';


@NgModule({
    declarations:[
        AdminLoginComponent,
        AdminHomeComponent,
        AdminNavbarComponent,
        AdminMainComponent,
    ],
    imports:[
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
    ]
})

export class AdminModule { }