import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettimeinComponent } from './gettimein.component';

describe('GettimeinComponent', () => {
  let component: GettimeinComponent;
  let fixture: ComponentFixture<GettimeinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettimeinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettimeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
