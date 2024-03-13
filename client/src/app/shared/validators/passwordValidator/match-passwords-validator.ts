import { FormGroup, ValidatorFn } from "@angular/forms";


export function matchPasswordsValidator(passwordOne: string, passwordTwo: string): ValidatorFn{
    return (control) => {
        const group = control as FormGroup;
        const passOne = group.get(passwordOne);
        const passTwo = group.get(passwordTwo);

        return passOne?.value === passTwo?.value ? null : { matchPasswordsValidator: true };
    }
}