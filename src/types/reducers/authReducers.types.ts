
export interface AuthState {

    authenticated: boolean,
    token: string,
    user: {
        username: string,
        email:string,
        firstName:string,
        lastName: string,
    }|null
}

export interface AuthAction {
    type: "START"|"LOGIN" | "LOGOUT";
    payload?: any;
}

export type authReducerType = {
    state: AuthState;
    action: AuthAction;
};
