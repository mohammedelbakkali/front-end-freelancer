import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGigsComponent } from './home-gigs.component';

describe('HomeGigsComponent', () => {
  let component: HomeGigsComponent;
  let fixture: ComponentFixture<HomeGigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
