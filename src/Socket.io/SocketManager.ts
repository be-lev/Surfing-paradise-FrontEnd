import { io, Socket } from "socket.io-client";
import store from "../Redux/store";
import{vacationAddedAction, vacationUpdatedAction ,vacationDeletedAction, vacationFollowedAction} from "../Redux/vacationsState"
import VacationModel from "../Components/VacationsArea/Models/VacationModel";

class SocketManager {

    private socket: Socket;

    //initial (usally is called init() )this function is been called on login of admin (on this project AuthArea - Login)
    public connect(): void {

        // Connect to socket.io:
        this.socket = io("http://localhost:3001");

        // Listen to socket.io events from backend- socket-helper:
        //when socket receive a message from server post action update redux state with the corresponding action
        this.socket.on("msg-from-server-vacation-added", (addedVacation: VacationModel) => {
            console.log(addedVacation);
            store.dispatch(vacationAddedAction(addedVacation));
        });

        this.socket.on("msg-from-server-vacation-updated", (updatedVacation: VacationModel) => {
           store.dispatch(vacationUpdatedAction(updatedVacation))
        });

        this.socket.on("msg-from-server-vacation-deleted", (vacationId: VacationModel) => {
            store.dispatch(vacationDeletedAction(vacationId))
        });

    }

//on logout 
    public disconnect() : void {
        this.socket.disconnect();
    }

}

export default SocketManager;

// making one variable for all the sockets-io 
export const socketManagerInstance = new SocketManager();