import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as fromAppSelector from '../selectors/app.selector';
import * as fromRouterStore from '@ngrx/router-store';
import * as fromlayoutActions from './../actions/layouts.actions';


@Injectable()
export class LayoutEffects {

    constructor(
        private actions$: Actions,
        private store: Store<any>,
    ) { }

    @Effect()
    onRouterChange$ = this.actions$.pipe(
        ofType(fromRouterStore.ROUTER_NAVIGATION),
        tap(data => console.log(data)),
        map((routerState: any) => routerState.payload.routerState.root.children[0].data.layout),
        map((newLayout) => fromlayoutActions.switchLayoutTo({
            layout: newLayout
        })),
    );
}

