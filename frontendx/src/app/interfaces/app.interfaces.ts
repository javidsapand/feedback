import * as fromRouter from '@ngrx/router-store';

export interface RouterState {
    router: fromRouter.RouterReducerState<any>;
}


export interface CourseDetailsState {
    courseById: any;
}



export interface UserState {
    username?: any;
    token?: any;
    expiresOn?: any;
    logged?: boolean;
}


export interface Credential {
    username: String;
    password: String;
}


export enum Layouts {
    EMPTY = 'EMPTY',
    SIDEBAR = 'SIDEBAR',
    HEADER = 'HEADER',
    BOTH = 'BOTH',
}


export interface Layout {
    layout: Layouts;
}

