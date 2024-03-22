import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  firstName: string = '';
  lastName: string = '';
  
  constructor(private userService: UserService){}

  ngOnInit(): void {
      const user = this.userService.getUser();
      this.firstName = user ? user.firstName : '';
      this.lastName = user ? user.lastName : '';
      
  }
}
