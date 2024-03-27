import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditPopupComponent } from './recipe-edit-popup.component';

describe('RecipeEditPopupComponent', () => {
  let component: RecipeEditPopupComponent;
  let fixture: ComponentFixture<RecipeEditPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeEditPopupComponent]
    });
    fixture = TestBed.createComponent(RecipeEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
