import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of, fromEvent } from 'rxjs';

import * as fromCourseDetailsActions from '../actions/course-details.actions';
import * as fromAppActions from '../actions/app.actions'
import * as fromAppSelector from '../selectors/app.selector';

import { ApolloService } from '../services/apollo.service';
import { switchMap, map, exhaustMap, mergeMap, tap, catchError, withLatestFrom, concatMap, debounceTime, filter } from 'rxjs/operators';
import * as fromCourseDetailsApollo from '../apollo/course-details.apollo';

@Injectable()
export class ArticleEffects {

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private store: Store<any>,
  ) { }

  @Effect()
  loadCourseById$ = this.actions$.pipe(
    ofType(fromCourseDetailsActions.loadCourseById),
    withLatestFrom(this.store.select(fromAppSelector.selectRouteParam('id'))),
    exhaustMap(([action, id]) => this.apolloService.query(fromCourseDetailsApollo.GET_COURSE(), {id: id})
      .pipe(
        map(course => (fromCourseDetailsActions.loadCourseByIdSucceed(course))),
        catchError((err) => of(fromAppActions.apolloError({ err: err}))))
      )
    );




  @Effect()
  onCourseByIdChange = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter(action => action.key === '__appActions'),
    debounceTime(500),
    filter(evt => evt.newValue !== null),
    map(action => {
      const [{ type, data }] = JSON.parse(action.newValue);
      if (fromCourseDetailsActions.loadCourseById.type === type) {
        const __appState = window.localStorage.getItem('__appState');
        const appStateData = __appState ? JSON.parse(__appState) : {};
        const apollo = {
          loading: false,
          networkStatus: 7,
          stale: false,
          data: appStateData.courseById
        };

        return fromCourseDetailsActions.loadCourseByIdSucceed(apollo);
      }

    }),
  );



  @Effect({ dispatch: false })
  storeCourseByIdActions = this.actions$.pipe(
    ofType(
      fromCourseDetailsActions.loadCourseById
    ),
    tap(action => {
      const storedActions = window.localStorage.getItem('__appActions');
      const actions = storedActions ? JSON.parse(storedActions) : [];
      const newActions = [action, ...actions];
      window.localStorage.setItem('__appActions', JSON.stringify(newActions)
      );
    }),
  );
}

