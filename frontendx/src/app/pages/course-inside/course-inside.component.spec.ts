import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInsideComponent } from './course-inside.component';

describe('CourseInsideComponent', () => {
  let component: CourseInsideComponent;
  let fixture: ComponentFixture<CourseInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
