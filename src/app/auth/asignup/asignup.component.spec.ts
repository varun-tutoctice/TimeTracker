import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignupComponent } from './asignup.component';

describe('AsignupComponent', () => {
  let component: AsignupComponent;
  let fixture: ComponentFixture<AsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
