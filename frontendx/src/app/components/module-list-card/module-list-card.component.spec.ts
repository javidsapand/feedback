import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListCardComponent } from './module-list-card.component';

describe('ModuleListCardComponent', () => {
  let component: ModuleListCardComponent;
  let fixture: ComponentFixture<ModuleListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
