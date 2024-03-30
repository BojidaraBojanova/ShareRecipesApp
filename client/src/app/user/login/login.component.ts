import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from 'src/app/shared/validators/emailVaidator/app-email-validator';
import { appPasswordValidator } from 'src/app/shared/validators/passwordValidator/app-password-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){}

  login(): void{
    if(this.form.invalid){
      return;
    }

    const { email, password } = this.form.value;


    this.userService.login(email!, password!).subscribe(()=>{
      alert('Login is successful!')
      this.router.navigate(['/']);
    }, error => {
      alert(error.error.message);
    })
  }

}
