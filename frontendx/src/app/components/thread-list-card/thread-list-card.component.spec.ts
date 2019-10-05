import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadListCardComponent } from './thread-list-card.component';

describe('ThreadListCardComponent', () => {
  let component: ThreadListCardComponent;
  let fixture: ComponentFixture<ThreadListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
