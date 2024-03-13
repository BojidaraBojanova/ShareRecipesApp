import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { appPasswordValidator } from "./app-password-validator";


@Directive({
    selector: '[appPassword]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PasswordDirective,
            multi: true
        }
    ]
})

export class PasswordDirective implements Validator, OnChanges{
    @Input() appPassword: string[] = [];

    validator: ValidatorFn = () => null;

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return this.validator(control);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentPasswordChanges = changes['appPassword'];
        if(currentPasswordChanges){
            this.validator = appPasswordValidator(currentPasswordChanges.currentValue);
        }
    }
}