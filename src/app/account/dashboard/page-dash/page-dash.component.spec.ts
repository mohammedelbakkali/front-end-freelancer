import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashComponent } from './page-dash.component';

describe('PageDashComponent', () => {
  let component: PageDashComponent;
  let fixture: ComponentFixture<PageDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
