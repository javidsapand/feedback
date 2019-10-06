import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private apollo: Apollo) { }
  public query(query: any, variables: Object) {
    return this.apollo
      .watchQuery({
        query: query,
        variables: variables,
      }).valueChanges;
  }

  public mutation(mutation: any, variables: Object) {
    return this.apollo
      .mutate({
        mutation: mutation,
        variables: variables,
      });
  }
}
