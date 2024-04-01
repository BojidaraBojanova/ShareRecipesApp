import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{

  users: User[] = [];
  userId: string = '';

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
      this.loadUsers();
      console.log('Users:',this.users);
  }


  loadUsers(): void{
    this.adminService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.users.forEach(user => {
          this.userId = user._id;
          console.log(user.favoriteRecipe)

        })
      }
    )
  }

  deleteUser(userId: string){
    this.adminService.deleteUser(userId).subscribe(() => {
      alert('User is deleted');
      this.loadUsers();
    })
  }

}
