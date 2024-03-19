import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLoginComponent } from "./login/admin-login.component";
import { AdminHomeComponent } from './admin-home/admin-home.component';


@NgModule({
    declarations:[
        AdminLoginComponent,
        AdminHomeComponent,
    ],
    imports:[
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
    ]
})

export class AdminModule { }