import { io, Socket } from "socket.io-client";
import store from "../Redux/store";
import VacationsModel from "../Components/VacationsArea/Models/VacationModel"
import{vacationAddedAction, vacationUpdatedAction ,vacationDeletedAction} from "../Redux/vacationsState"

class SocketManager {

    private socket: Socket;

    //initial (usally is called init() )this function is been called on login of admin (on this project AuthArea - Login)
    public connect(): void {

        // Connect to socket.io:
        this.socket = io("http://localhost:3001");

        // Listen to socket.io events from backend- socket-helper:
        //when socket receive a message from server post action update redux state with the corresponding action
        this.socket.on("msg-from-server-vacation-added", (addedVacation: VacationsModel) => {
            store.dispatch(vacationAddedAction(addedVacation));
        });

        this.socket.on("msg-from-server-vacation-updated", (updatedVacation: VacationsModel) => {
           store.dispatch(vacationUpdatedAction(updatedVacation))
        });

        //! i suspect the ID argument here
        this.socket.on("msg-from-server-vacation-deleted", (id: VacationsModel) => {
            store.dispatch(vacationDeletedAction(id))
        });
    }

//on logout of admin
    public disconnect() : void {
        this.socket.disconnect();
    }

}

export default SocketManager;

// making one variable for all the sockets-io 
export const socketManagerInstance = new SocketManager();