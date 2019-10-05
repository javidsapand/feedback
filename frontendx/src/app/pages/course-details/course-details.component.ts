import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


import * as fromCourseDetailsActions from '../../actions/course-details.actions';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<any> = this.store.select('courseById');

  constructor(
    public _actRouter: ActivatedRoute,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.store.dispatch(fromCourseDetailsActions.loadCourseById());
  }
}

