import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private adminService: AdminService, private router: Router){}

  logout():void{
    this.adminService.logout().subscribe({
      next: () => {
        this.router.navigate(['/admin/login'])
      }
    })
  }
}
