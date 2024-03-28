import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmailDirective } from "./validators/emailVaidator/email.directive";
import { PasswordDirective } from "./validators/passwordValidator/password.directive";
import { LoaderComponent } from './loader/loader.component';


@NgModule({
    declarations: [
        EmailDirective,
        PasswordDirective,
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        EmailDirective,
        PasswordDirective,
        LoaderComponent
    ]
})

export class SharedModule { }