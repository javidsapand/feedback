import { Action, props, createAction } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { ObservableInput } from 'rxjs';
import * as fromAppInterfaces from '../interfaces/app.interfaces';


export const login = createAction('login', props<fromAppInterfaces.Credential>());
export const loginSucceed = createAction('loginSucceed', props<object | Object>());

export const signup = createAction('signup', props<fromAppInterfaces.Credential>());
export const forgetPassword = createAction('forgetPassword', props<Object>());
export const renewPassword = createAction('renewPassword', props<Object>());
