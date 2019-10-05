import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorListCardComponent } from './instructor-list-card.component';

describe('InstructorListCardComponent', () => {
  let component: InstructorListCardComponent;
  let fixture: ComponentFixture<InstructorListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
