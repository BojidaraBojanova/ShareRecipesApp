import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from 'src/app/shared/validators/emailVaidator/app-email-validator';
import { appPasswordValidator } from 'src/app/shared/validators/passwordValidator/app-password-validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/passwordValidator/match-passwords-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

  get passGroup(){
    return this.form.get('passGroup');
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){}

  register(): void{
    if(this.form.invalid){
      return;
    }

    const { firstName, lastName, email, passGroup: {password, rePassword} = {}} = this.form.value;

    this.userService.register(firstName!, lastName!, email!, password!, rePassword!).subscribe(() => {
      alert('Registration is successful!');
      this.router.navigate(['/'])
    }, error => {
      alert(error.error.message);
    })

  }
}
