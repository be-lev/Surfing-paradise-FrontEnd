import React from "react";
import "./Logo.css";
import logoImage from "../../../assets/images/Surfing-Makes-You-Happy.jpg"
function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logoImage} alt="logo"/>
        </div>
    );
}

export default Logo;
