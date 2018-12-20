import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApasswordComponent } from './apassword.component';

describe('ApasswordComponent', () => {
  let component: ApasswordComponent;
  let fixture: ComponentFixture<ApasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
