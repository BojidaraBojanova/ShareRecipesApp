import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit{

  categories: Category[] = [];

  form = this.fb.group({
    categoryName: ['', [Validators.required]],
    image: ['', [Validators.required]],
  }) 
  
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router){}

  ngOnInit(): void {
      this.loadCategories();
  }

  createCategory():void{
    if(this.form.invalid){
      return;
    }
    const{ categoryName, image } = this.form.value;

    this.adminService.createCategory(categoryName!, image!).subscribe(()=>{
      window.location.reload();
    })
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
