import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeincurrentComponent } from './timeincurrent.component';

describe('TimeincurrentComponent', () => {
  let component: TimeincurrentComponent;
  let fixture: ComponentFixture<TimeincurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeincurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeincurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
