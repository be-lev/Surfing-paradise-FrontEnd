
import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/vacations"> Vacations </NavLink>
            <span> | </span>
			<NavLink to="/home"> Home </NavLink>
            <span> | </span>
            <NavLink to={"/register"} > register </NavLink>
            <span> | </span>
            <NavLink to={"/login"} > Login </NavLink>
            <span> | </span>
            <NavLink to={"/logout"} > Logout </NavLink> 

           
			
        </div>
    );
}

export default Menu;
