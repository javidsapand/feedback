import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as fromCourseDetailsActions from '../actions/course-details.actions';
import * as fromAppActions from '../actions/app.actions'
import * as fromAppSelector from '../selectors/app.selector';

import { ApolloService } from '../services/apollo.service';
import { map, exhaustMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import * as fromCourseDetailsApollo from '../apollo/course-details.apollo';
import { IMediaSubscriptions } from 'videogular2/compiled/src/core/vg-media/i-playable';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Observable } from 'apollo-link';

@Injectable()
export class CourseDetailsEffects {

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private store: Store<any>,
  ) { }

  @Effect()
  loadCourseById$ = this.actions$.pipe(
    ofType(fromCourseDetailsActions.loadCourseById),
    withLatestFrom(this.store.select(fromAppSelector.selectRouteParam('id'))),
    exhaustMap(([action, id]) => this.apolloService.query(fromCourseDetailsApollo.GET_COURSE(), { id: id })
      .pipe(
        map(course => (fromCourseDetailsActions.loadCourseByIdSucceed(course))),
        catchError((err) => of(fromAppActions.apolloError({ err: err }))))
    )
  );

  // @Effect()
  // videoEnded = this.actions$.pipe(
  //   ofType(fromCourseDetailsActions.loadStart),
  //   tap((event) => console.log(event))
  // )

}

