import VacationModel from "../Components/VacationsArea/Models/VacationModel";

export class VacationState {
    public vacations: VacationModel[] = [];
}

export enum VacationActionType {
    VacationDownloaded = "VacationDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted",
    VacationFollowed = "VacationFollowed"
};

export interface VacationAction {
    type: VacationActionType;
    payload?: any;
}



export function vacationsDownloadedAction(vacations: VacationModel[]): VacationAction {
    return { type: VacationActionType.VacationDownloaded, payload: vacations }
};

export function vacationAddedAction(vacation: VacationModel): VacationAction {
    return { type: VacationActionType.VacationAdded, payload: vacation }
};

export function vacationUpdatedAction(vacation: VacationModel): VacationAction {
    return { type: VacationActionType.VacationUpdated, payload: vacation }
}

export function vacationDeletedAction(vacation: VacationModel): VacationAction {
    return { type: VacationActionType.VacationDeleted, payload: vacation }
};

export function vacationFollowedAction(vacation: VacationModel): VacationAction {
    return { type: VacationActionType.VacationFollowed, payload: vacation }
};



export function VacationsReducer(currentState: VacationState = new VacationState(), action: VacationAction): VacationState {
    const newState = { ...currentState };

    switch (action.type) {
        case VacationActionType.VacationDownloaded:
            newState.vacations = action.payload;
            break;
            
        case VacationActionType.VacationAdded:
            newState.vacations.push(action.payload)
            break;

        case VacationActionType.VacationUpdated:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
            newState.vacations[indexToUpdate] = action.payload
            break;

        case VacationActionType.VacationDeleted:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            newState.vacations.splice(indexToDelete, 1)
            break;

        case VacationActionType.VacationFollowed:
            newState.vacations[indexToUpdate] = action.payload
            break;
    }


    return newState
}

