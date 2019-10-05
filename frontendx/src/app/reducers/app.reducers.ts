import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector, Action, createReducer, on } from '@ngrx/store';
import * as fromCourseDetailsReducer from './course-details.reducer';
import * as fromAppActions from '../actions/app.actions';

import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { ApolloError } from 'apollo-client';


export const ErrorinitialState: ApolloError = {
  name: null,
  message: null,
  graphQLErrors: null,
  networkError: null,
  extraInfo: null,
};

const ApolloErrorReducer = createReducer(
  ErrorinitialState,
  on(fromAppActions.apolloError, (state, err) => ({ ...err.err }))
);

export function errorReducer(state: ApolloError | undefined, action: Action) {
  return ApolloErrorReducer(state, action);
}



export function presistReducers(reducer: any): ActionReducer<any> {
  return function (state: any, action: any): any {
    const localStorageKey = '__appState';
    if (state === undefined || null) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted
        ? JSON.parse(persisted)
        : reducer(state, action);
    }

    const newState = reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(newState));
    return newState;
  };
}



export function stateCacherByUrl(reducer: any): ActionReducer<any> {
  return function (state: any, action: any): any {
    const url = window.location.pathname;
    const newState = reducer(state, action);
    localStorage.setItem(url, JSON.stringify(newState));
    return newState;
  };
}



export function stateReturnByUrl(reducer: any): ActionReducer<any> {
  return function (state: any, action: any): any {
    const localStorageKey = window.location.pathname;
    if (state === undefined || null) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted
        ? JSON.parse(persisted)
        : reducer(state, action);
    }

    return reducer(state, action);
  };
}


export function logger(reducer: any): ActionReducer<any> {
  return function (state: any, action: any): any {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}



export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [stateReturnByUrl, stateCacherByUrl, presistReducers, logger]
  : [stateReturnByUrl, stateCacherByUrl, presistReducers];



export const reducers = {
  courseById: fromCourseDetailsReducer.reducer,
  router: fromRouter.routerReducer,
  apolloError: errorReducer
};
