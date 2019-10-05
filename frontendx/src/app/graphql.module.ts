import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { ApolloLink, concat, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { Store } from '@ngrx/store';

import * as fromAppActions from './actions/app.actions';

const uri = 'http://localhost:8000/graphql/'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {

  const http = httpLink.create({ uri, withCredentials: true, });

  const authMiddleware = new ApolloLink((operation, forward) => {
    if (localStorage.getItem('token') || null) {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || null)
      });
    }


    return forward(operation);
  });



  const Errors = onError(({graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[Elearning GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) { console.log(`[Elearning Network error]: ${networkError}`); }

    return forward(operation);
  });


  return {
    link: from([Errors , authMiddleware, http]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  constructor() {
  }
}
