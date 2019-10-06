import { createFeatureSelector, createSelector, Action } from '@ngrx/store';
import * as fromUserActions from '../actions/user.actions';
import * as fromAppInterfaces from '../interfaces/app.interfaces';
import { createReducer, on } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { ObservableInput } from 'rxjs';
import { stat } from 'fs';

export const initialState: fromAppInterfaces.UserState = {};

const userReducer = createReducer(
    initialState,
    on(fromUserActions.loginSucceed,
        (state, apollo: any) => ({
            ...state,
            token: apollo.data.tokenAuth.token,
            expiresOn: Date.now() + 3600,
            logged: true
        })),

);

export function reducer(state: fromAppInterfaces.UserState | undefined, action: Action) {
    return userReducer(state, action);
}
