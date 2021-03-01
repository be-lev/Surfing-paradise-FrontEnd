import "./Logout.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import store from "../../../Redux/store";
import { userLoggedOutAction } from "../../../Redux/AuthState";

function Logout(): JSX.Element {

    function logout(): void {
      
        const userState = store.getState().authState.user
        const action = userLoggedOutAction(userState)
        store.dispatch(action)

        socketManagerInstance.disconnect();


        
    }

    return (
        <div className="Logout">
			<button onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;
