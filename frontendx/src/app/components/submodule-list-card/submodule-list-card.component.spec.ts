import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleListCardComponent } from './submodule-list-card.component';

describe('SubmoduleListCardComponent', () => {
  let component: SubmoduleListCardComponent;
  let fixture: ComponentFixture<SubmoduleListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmoduleListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmoduleListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
