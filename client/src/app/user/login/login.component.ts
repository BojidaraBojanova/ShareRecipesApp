import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from 'src/app/shared/validators/emailVaidator/app-email-validator';
import { appPasswordValidator } from 'src/app/shared/validators/passwordValidator/app-password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = this.fb.group({
    email: ['', [Validators.required, appEmailValidator()]],
    password: ['', [Validators.required, appPasswordValidator()]]
  })
  
  constructor(private fb: FormBuilder){}

  login(): void{
    if(this.form.invalid){
      return;
    }

    console.log(this.form.value);
  }

}
