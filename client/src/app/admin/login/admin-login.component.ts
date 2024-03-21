import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appPasswordValidator } from '../../shared/validators/passwordValidator/app-password-validator';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent{
  
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, appPasswordValidator()]]
  })

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router){}

  login(): void{
    if(this.form.invalid){
      return;
    }

    const { username, password } = this.form.value;

    console.log(this.adminService.login(username!, password!).subscribe())

    this.adminService.login(username!, password!).subscribe(()=>{
      this.router.navigate(['admin/home']);
    })
  }
}
