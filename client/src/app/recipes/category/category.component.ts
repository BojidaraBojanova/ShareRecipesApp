import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categories: Category[] = [];

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.loadCategories();
}

  loadCategories():void{
    this.adminService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(this.categories)
      }
    )
  }

}
