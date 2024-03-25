import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileDetails, User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profileDetails: ProfileDetails = {
    firstName: '',
    lastName: '',
    email: ''
  };

  isPopupVisible: boolean = false;
  
  constructor(private userService: UserService){}

  ngOnInit(): void {
      
    this.userService.user$.subscribe(user => {
      if(user){
       this.showProfileDetails(user);
      }else{
        const storedUser = this.userService.getUser();

        if(storedUser){
          this.showProfileDetails(storedUser);
        }else{
          this.profileDetails = {
            firstName: '',
            lastName: '',
            email: ''
          }
        }
      }
    })  
  }
 
  showProfileDetails(user: User):void{
    const{ firstName, lastName, email } = user;
    this.profileDetails = {
      firstName, 
      lastName,
      email
    }
  }

  showPopup(){
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false
  }
}
