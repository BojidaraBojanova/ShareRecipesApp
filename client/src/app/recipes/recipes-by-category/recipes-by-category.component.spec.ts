import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesByCategoryComponent } from './recipes-by-category.component';

describe('RecipesByCategoryComponent', () => {
  let component: RecipesByCategoryComponent;
  let fixture: ComponentFixture<RecipesByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesByCategoryComponent]
    });
    fixture = TestBed.createComponent(RecipesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
