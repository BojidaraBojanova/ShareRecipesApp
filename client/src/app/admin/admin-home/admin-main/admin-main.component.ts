import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit{

  name: string = '';

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
      const admin = this.adminService.getAdmin();
      this.name = admin ? admin.username : '';
      console.log(admin);
  }

  
}
