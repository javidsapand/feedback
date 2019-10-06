import { createAction, props } from '@ngrx/store';
import { ApolloError } from 'apollo-client';

export const apolloError = createAction('apolloError', props<{err: ApolloError}>());
