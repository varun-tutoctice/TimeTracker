import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettimeoutComponent } from './gettimeout.component';

describe('GettimeoutComponent', () => {
  let component: GettimeoutComponent;
  let fixture: ComponentFixture<GettimeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettimeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
