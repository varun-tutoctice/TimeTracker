import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprofileComponent } from './aprofile.component';

describe('AprofileComponent', () => {
  let component: AprofileComponent;
  let fixture: ComponentFixture<AprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
