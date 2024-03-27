import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/types/user';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from 'src/app/shared/validators/emailVaidator/app-email-validator';
import { appPasswordValidator } from 'src/app/shared/validators/passwordValidator/app-password-validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/passwordValidator/match-passwords-validator';

@Component({
  selector: 'app-profile-edit-popup',
  templateUrl: './profile-edit-popup.component.html',
  styleUrls: ['./profile-edit-popup.component.css']
})
export class ProfileEditPopupComponent implements OnInit{

  userId: string = '';

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



  @Output() close: EventEmitter<void> = new EventEmitter<void>();


  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
    this.getUserId();

  }

  getUserId(){
    const user = this.userService.getUser();
    if(user){
      this.userId = user._id;
      this.populateForm(user);
    }
  }

  populateForm(user: User){
    this.form.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }


  edit(){
    if(this.form.invalid){
      return;
    }

    const {firstName, lastName, email, passGroup: {password, rePassword} = {} } = this.form.value;

    this.userService.editUser(this.userId, firstName!, lastName!, email!, password!, rePassword!).subscribe(()=>{
      console.log('Successful editing the user');
      window.location.reload();
    })
  }


  closePopup(){
    this.close.emit();    
  }
}
