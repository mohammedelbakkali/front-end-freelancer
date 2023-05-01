import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigAddComponent } from './gig-add.component';

describe('GigAddComponent', () => {
  let component: GigAddComponent;
  let fixture: ComponentFixture<GigAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
