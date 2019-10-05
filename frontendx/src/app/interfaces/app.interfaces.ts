import * as fromRouter from '@ngrx/router-store';

export interface RouterState {
    router: fromRouter.RouterReducerState<any>;
}


export interface CourseDetailsState {
    courseById: any;
}



export interface UserState {
    user: any;
}


export interface Credential {
    username: String;
    password: String;
}

