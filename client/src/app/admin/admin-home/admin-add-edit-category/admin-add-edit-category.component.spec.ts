import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditCategoryComponent } from './admin-add-edit-category.component';

describe('AdminAddCategoryComponent', () => {
  let component: AdminAddEditCategoryComponent;
  let fixture: ComponentFixture<AdminAddEditCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddEditCategoryComponent]
    });
    fixture = TestBed.createComponent(AdminAddEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
