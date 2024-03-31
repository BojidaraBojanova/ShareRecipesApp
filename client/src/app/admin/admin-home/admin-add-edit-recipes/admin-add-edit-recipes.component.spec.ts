import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditRecipesComponent } from './admin-add-edit-recipes.component';

describe('AdminAddEditRecipesComponent', () => {
  let component: AdminAddEditRecipesComponent;
  let fixture: ComponentFixture<AdminAddEditRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddEditRecipesComponent]
    });
    fixture = TestBed.createComponent(AdminAddEditRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
