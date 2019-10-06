import { Action, props, createAction } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { ObservableInput } from 'rxjs';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';


export const loadCourseById = createAction('loadCourseById');
export const loadCourseByIdSucceed = createAction('loadCourseByIdSucceed', props<ApolloQueryResult<unknown>>());





export const abort = createAction('abort', props<{}>());
export const bufferDetected = createAction('bufferDetected', props<{}>());
export const canPlay = createAction('canPlay', props<{}>());
export const canPlayThrough = createAction('canPlayThrough', props<{}>());
export const durationChange = createAction('durationChange', props<{}>());
export const emptied = createAction('emptied', props<{}>());
export const encrypted = createAction('encrypted', props<{}>());
export const ended = createAction('ended', props<{}>());
export const error = createAction('error', props<{}>());
export const loadedData = createAction('loadedData', props<{}>());
export const loadedMetadata = createAction('loadedMetadata', props<{}>());
export const loadStart = createAction('loadStart', props<{}>());
export const pause = createAction('pause', props<{}>());
export const play = createAction('play', props<{}>());
export const playing = createAction('playing', props<{}>());
export const progress = createAction('progress', props<{}>());
export const rateChange = createAction('rateChange', props<{}>());
export const seeked = createAction('seeked', props<{}>());
export const seeking = createAction('seeking', props<{}>());
export const stalled = createAction('stalled', props<{}>());
export const suspend = createAction('suspend', props<{}>());
export const timeUpdate = createAction('timeUpdate', props<{}>());
export const volumeChange = createAction('volumeChange', props<{}>());
export const waiting = createAction('waiting', props<{}>());
export const startAds = createAction('startAds', props<{}>());
export const endAds = createAction('endAds', props<{}>());
