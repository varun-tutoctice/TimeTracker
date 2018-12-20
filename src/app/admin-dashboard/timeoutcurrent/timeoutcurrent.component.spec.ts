import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutcurrentComponent } from './timeoutcurrent.component';

describe('TimeoutcurrentComponent', () => {
  let component: TimeoutcurrentComponent;
  let fixture: ComponentFixture<TimeoutcurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeoutcurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutcurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
