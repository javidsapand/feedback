import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, ObjectUnsubscribedError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

import * as fromCourseDetailsActions from '../../actions/course-details.actions';
import {map } from 'rxjs/operators';
import { Object } from 'core-js';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  course$: Observable<any> = this.store.select('courseById');
  @ViewChild('videoPlayer', { static: false }) videoPlayer: VideoPlayerComponent;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.dispatch(fromCourseDetailsActions.loadCourseById());
  }


  ngAfterViewInit() {
    Object.entries(
      this.videoPlayer.videoApi.getDefaultMedia().subscriptions
    ).reduce(
      (_, [key, value]) =>
        value.pipe(
          map(
            (event) => {
              if (key !== 'timeUpdate' && key !== 'bufferDetected') {
                return this.store.dispatch(fromCourseDetailsActions[key](event));
              } else {
                return of(null);
              }
            }
          ),
        ).subscribe(), new Observable<any>());
  }
}

