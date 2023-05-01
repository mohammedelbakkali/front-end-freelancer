import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGigsComponent } from './manage-gigs.component';

describe('ManageGigsComponent', () => {
  let component: ManageGigsComponent;
  let fixture: ComponentFixture<ManageGigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
