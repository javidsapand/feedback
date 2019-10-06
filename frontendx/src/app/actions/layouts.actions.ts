import { Action, props, createAction } from '@ngrx/store';
import { Layout } from '../interfaces/app.interfaces';

export const switchLayoutTo = createAction('switchLayoutTo', props<Layout>());
