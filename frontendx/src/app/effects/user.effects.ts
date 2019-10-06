import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as fromUserActions from '../actions/user.actions';
import * as fromAppActions from '../actions/app.actions';
import * as fromAppSelector from '../selectors/app.selector';
import * as fromAppInterfaces from '../interfaces/app.interfaces';
import { ApolloService } from '../services/apollo.service';
import { map, exhaustMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import * as fromUserApollo from '../apollo/user.apollo';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private apolloService: ApolloService,
    ) { }

    @Effect()
    login$ = this.actions$.pipe(
        ofType(fromUserActions.login),
        exhaustMap(
            (userCredential: fromAppInterfaces.Credential) =>
                this.apolloService.mutation(
                    fromUserApollo.GET_AUTH_TOKEN(),
                    userCredential
                ).pipe(
                    map(token => (fromUserActions.loginSucceed(token))),
                    catchError((err) => of(fromAppActions.apolloError({ err: err })))
                )
        )
    );


}

