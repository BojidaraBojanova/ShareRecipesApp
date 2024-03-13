import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from 'src/app/shared/validators/emailVaidator/app-email-validator';
import { appPasswordValidator } from 'src/app/shared/validators/passwordValidator/app-password-validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/passwordValidator/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, appEmailValidator()]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, appPasswordValidator()]],
      rePassword: ['', [Validators.required]],
    }, {
      validators: [matchPasswordsValidator('password', 'rePassword')],
    })
  });

  constructor(private fb: FormBuilder){}

  register(): void{
    if(this.form.invalid){
      return;
    }

    console.log(this.form.value);
  }
}
