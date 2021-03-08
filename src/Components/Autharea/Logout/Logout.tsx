import "./Logout.css";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import store from "../../../Redux/store";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
function Logout(): JSX.Element {
  const history = useHistory();

  const { user } = useSelector((state) => state.authState);
  function logout(): void {
    const action = userLoggedOutAction(user);
    store.dispatch(action);
    //disconnect to socket-io machismo
    socketManagerInstance.disconnect();

    history.push("/home");
    alert("Goodbye friend, I'm not sure why but you choose to logged out");
  }

  return (
    <div className="Logout">
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
