import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCategoryComponent } from './admin-add-category.component';

describe('AdminAddCategoryComponent', () => {
  let component: AdminAddCategoryComponent;
  let fixture: ComponentFixture<AdminAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddCategoryComponent]
    });
    fixture = TestBed.createComponent(AdminAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
