import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPortfolioComponent } from './instructor-portfolio.component';

describe('InstructorPortfolioComponent', () => {
  let component: InstructorPortfolioComponent;
  let fixture: ComponentFixture<InstructorPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
