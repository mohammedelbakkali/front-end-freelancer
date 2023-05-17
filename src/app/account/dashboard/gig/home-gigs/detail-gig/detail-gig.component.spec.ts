import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGigComponent } from './detail-gig.component';

describe('DetailGigComponent', () => {
  let component: DetailGigComponent;
  let fixture: ComponentFixture<DetailGigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
