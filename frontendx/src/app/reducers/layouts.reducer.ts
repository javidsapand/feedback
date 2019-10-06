import { createFeatureSelector, createSelector, Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import * as fromlayoutActions from './../actions/layouts.actions';
import * as fromAppInterfaces from '../interfaces/app.interfaces';


export const initialState: fromAppInterfaces.Layout = { layout: fromAppInterfaces.Layouts.EMPTY };


const switchLayoutReducer = createReducer(
    initialState,
    on(fromlayoutActions.switchLayoutTo, (state, newState) => ({ ...state, layout: newState.layout })),

);

export function reducer(state: fromAppInterfaces.Layout | undefined, action: Action) {
    return switchLayoutReducer(state, action);
}



