import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmailDirective } from "./validators/emailVaidator/email.directive";
import { PasswordDirective } from "./validators/passwordValidator/password.directive";


@NgModule({
    declarations: [
        EmailDirective,
        PasswordDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        EmailDirective,
        PasswordDirective
    ]
})

export class SharedModule { }