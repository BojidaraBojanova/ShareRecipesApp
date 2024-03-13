import { ValidatorFn } from "@angular/forms";

export function appEmailValidator(domains?: string[]): ValidatorFn{
    const regExp = new RegExp(`^[a-zA-Z0-9._%+-]{10,}@[a-zA-Z.-]{2,}\.[a-zA-Z]{2,7}$`)

    return (control) => {
        return control.value === '' || regExp.test(control.value) ? null : { appEmailValidator: true };
    }
}