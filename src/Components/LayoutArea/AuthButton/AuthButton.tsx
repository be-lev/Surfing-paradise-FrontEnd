import React from "react";
import { useSelector  } from 'react-redux'
import { NavLink } from "react-router-dom";



function AuthButton(): JSX.Element {

    
const {user} = useSelector(state => state.authState)


if (!user.isLoggedIn) {
    return <NavLink to={"/login"} > Login </NavLink> 
     && <NavLink to={"/register"} > register </NavLink>
  } else if (!!+user.isAdmin){
    return   <NavLink to={"/vacations/add-vacation/"} > Add vacation </NavLink> 
    
} else {
    return <NavLink to={"/logout"} > Logout </NavLink>
  }
    
}

export default AuthButton;
