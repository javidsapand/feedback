import { Action, props, createAction } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { ObservableInput } from 'rxjs';
import * as fromAppInterface from '../interfaces/app.interfaces';

export const login = createAction('login', props<Object>());
export const signup = createAction('signup', props<Object>());
export const forgetPassword = createAction('forgetPassword', props<Object>());
export const renewPassword = createAction('renewPassword', props<Object>());