import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizorexerciseListCardComponent } from './quizorexercise-list-card.component';

describe('QuizorexerciseListCardComponent', () => {
  let component: QuizorexerciseListCardComponent;
  let fixture: ComponentFixture<QuizorexerciseListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizorexerciseListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizorexerciseListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
