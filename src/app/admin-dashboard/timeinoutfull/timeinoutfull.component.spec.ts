import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeinoutfullComponent } from './timeinoutfull.component';

describe('TimeinoutfullComponent', () => {
  let component: TimeinoutfullComponent;
  let fixture: ComponentFixture<TimeinoutfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeinoutfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeinoutfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
