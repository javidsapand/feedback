import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPortfolioComponent } from './applicant-portfolio.component';

describe('ApplicantPortfolioComponent', () => {
  let component: ApplicantPortfolioComponent;
  let fixture: ComponentFixture<ApplicantPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
