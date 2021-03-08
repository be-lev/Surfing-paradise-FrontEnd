import UserModel from "../Components/Autharea/UserModel"



export class AuthState {
    public user:UserModel = {
    firstName:"" ,
     lastName: "",
     username: "",
     password: "",
     isAdmin:false,
     token:"",
     uuid: "",
     isLoggedIn: false,
     findIndex: "",
    splice: "",
    
    } 
}

export enum AuthActionType {
    userLoggedIn = "userLoggedIn",
    userLoggedOut = "userLoggedOut",
    userUpdated = "userUpdated",
    userDeleted = "userDeleted"
}

export interface AuthAction {
    type: AuthActionType;
    payload?:any;
}

export function userLoggedInAction(user:UserModel):AuthAction{
    return{type:AuthActionType.userLoggedIn, payload: user }
}

export function userLoggedOutAction(user:UserModel):AuthAction{
    return{type:AuthActionType.userLoggedOut, payload: user }
}

export function userUpdatedAction(user:UserModel):AuthAction{
    return{type:AuthActionType.userUpdated, payload: user }
}

export function userDeletedAction(user:UserModel):AuthAction{
    return{type:AuthActionType.userDeleted, payload: user }
}

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {  
        case AuthActionType.userLoggedIn:
            newState.user = 
            newState.user = action.payload;
            break;

        case AuthActionType.userLoggedOut:
            newState.user = null;
            break;

        case AuthActionType.userUpdated:
            const indexToUpdate:any = newState.user.findIndex(v => v.id === action.payload.id);
            newState.user[indexToUpdate] = action.payload
            break;

        case AuthActionType.userDeleted:
            const indexToDelete = newState.user.findIndex(v => v.id === action.payload)
            newState.user.splice(indexToDelete, 1)
            break;

     }
    return newState
}
