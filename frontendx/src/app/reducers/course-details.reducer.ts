import { createFeatureSelector, createSelector, Action } from '@ngrx/store';
import * as fromCourseDetailsActions from '../actions/course-details.actions';
import * as fromAppInterfaces from '../interfaces/app.interfaces';
import { createReducer, on } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { ObservableInput } from 'rxjs';
import { stat } from 'fs';

export const initialState: fromAppInterfaces.CourseDetailsState = {
  courseById: {}
};

const courseDetialsReducer = createReducer(
  initialState,
  on(fromCourseDetailsActions.loadCourseById, state => ({ ...state })),
  on(fromCourseDetailsActions.loadCourseByIdSucceed, (state, apollo: ApolloQueryResult<any> ) => ({
        ...state,
        courseById: apollo.data.courseById
      })),

);

export function reducer(state: fromAppInterfaces.CourseDetailsState | undefined, action: Action) {
  return courseDetialsReducer(state , action);
}
