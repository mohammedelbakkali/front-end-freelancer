import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBySubCategoryComponent } from './get-by-sub-category.component';

describe('GetBySubCategoryComponent', () => {
  let component: GetBySubCategoryComponent;
  let fixture: ComponentFixture<GetBySubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBySubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
