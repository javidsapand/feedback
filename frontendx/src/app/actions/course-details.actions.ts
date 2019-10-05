import { Action, props, createAction } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { ObservableInput } from 'rxjs';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';

export const loadCourseById = createAction('loadCourseById');
export const loadCourseByIdSucceed = createAction('loadCourseByIdSucceed', props<ApolloQueryResult<unknown>>());
