import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListCardComponent } from './content-list-card.component';

describe('ContentListCardComponent', () => {
  let component: ContentListCardComponent;
  let fixture: ComponentFixture<ContentListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
