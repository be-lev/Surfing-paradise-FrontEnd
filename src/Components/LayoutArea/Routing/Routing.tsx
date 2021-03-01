import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Page404 from "../Page404/Page404";
import Home from "../../HomeArea/Home/Home";
import Login from "../../Autharea/Login/Login";
import Logout from "../../Autharea/Logout/Logout";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import VacationsReports from "../../AdminArea/VacationsReports/VacationsReports";
import About from "../../HomeArea/About/About";
import ContactUs from "../../HomeArea/ContactUs/ContactUs";
import Register from "../../Autharea/Register/Register";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
        <Route path="/home" component={Home} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/logout" component={Logout} exact/>
        <Route path="/vacations" component={VacationsList} exact/>
        <Route path="/vacations/add-vacation" component={AddVacation} exact/>
        <Route path="/vacations/edit/:vacationId" component={EditVacation} exact/>
        <Route path="/vacations/reports" component={VacationsReports} exact/>
        <Route path="/about" component={About} exact/>
        <Route path="/contact-us" component={ContactUs} exact/>
        <Redirect from="/" to="/home" exact/>
        <Route component={Page404} exact/>
            </Switch>
        </div>
    );
}

export default Routing;
