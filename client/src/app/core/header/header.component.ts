import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchQuery: string = '';

  constructor(private userService: UserService, private router: Router){}

  get isLoggedIn(): boolean{
    return this.userService.isLogged;
  }

  logout():void{
    this.userService.logout().subscribe({
      next: ()=>{
        this.router.navigate(['/users/login']);
      }
    })
  }

  search():void{
    if(this.searchQuery.trim() !== ''){
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery }});
      this.searchQuery = '';
    }
  }

}
