import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthButton from "../AuthButton/AuthButton";


function Menu(): JSX.Element {

    return (
        <div className="Menu">
			<NavLink to="/vacations"> Vacations </NavLink>
            <span> | </span>
			<NavLink to="/home"> Home </NavLink>
            <span> | </span>
            <NavLink to={"/vacations/add-vacation/"} > Add vacation </NavLink>
            <span> | </span>
            <NavLink to={"/register"} > register </NavLink>
            <span> | </span>
            <NavLink to={"/login"} > Login </NavLink>
            <span> | </span>
            <NavLink to={"/logout"} > Logout </NavLink> 

            {/* <AuthButton /> */}
			
        </div>
    );
}

export default Menu;
