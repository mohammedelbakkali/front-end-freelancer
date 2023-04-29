import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinfosComponent } from './editinfos.component';

describe('EditinfosComponent', () => {
  let component: EditinfosComponent;
  let fixture: ComponentFixture<EditinfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditinfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
