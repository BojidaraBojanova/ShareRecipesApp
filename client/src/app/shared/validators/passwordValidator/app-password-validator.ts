import { ValidatorFn } from "@angular/forms";


export function appPasswordValidator(domains?: string[]): ValidatorFn{
    const regExp = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$`);

    return (control) => {
        return control.value === '' || regExp.test(control.value) ? null : { appPasswordValidator: true };
    }
}