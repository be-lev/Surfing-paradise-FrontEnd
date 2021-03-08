import "./Logout.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import store from "../../../Redux/store";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import { useHistory } from "react-router-dom";
function Logout(): JSX.Element {
    const history = useHistory();
    function logout(): void {
      
        const userState = store.getState().authState.user
        const action = userLoggedOutAction(userState)
        store.dispatch(action)

        socketManagerInstance.disconnect();

        history.push("/home");
        alert("Goodbye friend, I'm not sure why but you choose to logged out")
    }

    return (
        <div className="Logout">
			<button onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;
