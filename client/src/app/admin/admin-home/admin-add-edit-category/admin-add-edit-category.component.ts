import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-admin-add-edit-category',
  templateUrl: './admin-add-edit-category.component.html',
  styleUrls: ['./admin-add-edit-category.component.css']
})
export class AdminAddEditCategoryComponent implements OnInit{

  categories: Category[] = [];
  categoryData: Category = {_id: '', categoryName: '', image: ''};
  isEditMode: boolean = false;
  categoryId: string = '';

  form = this.fb.group({
    categoryId: ['', [Validators.required]],
    categoryName: ['', [Validators.required]],
    image: ['', [Validators.required]],
  }) 
  
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router){}

  ngOnInit(): void {
      this.loadCategories();
  }

  editCategory(category: Category){
    window.scrollTo(0, 0);
    this.form.patchValue({
      categoryName: category.categoryName,
      image: category.image
    });

    this.isEditMode = true;
    this.categoryId = category._id;

  }

  addOrEditCategory(){
    
    const { categoryName, image } = this.form.value;

    console.log('this.isEditMode');

    if(this.isEditMode){
      this.adminService.editCategory(this.categoryId, categoryName!, image!).subscribe(() => {
        this.clearFormAndReload();
      })

    }else{
      this.adminService.createCategory(categoryName!, image!).subscribe(()=>{
        this.clearFormAndReload();
      })
    }
  }

  deleteCategory(categoryId: string) {
    window.scrollTo(0, 0);
    this.adminService.deleteCategory(categoryId).subscribe(()=>{
      this.clearFormAndReload();
    })
  }

  clearFormAndReload(): void{
    this.form.reset();
    this.isEditMode = false;
    this.loadCategories();
  }

  loadCategories():void{
    this.adminService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    )
  }

}
