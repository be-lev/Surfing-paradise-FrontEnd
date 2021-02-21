import React from "react";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {

    const myDynamicStyling = {
        color: Math.random() < 0.5 ? "green" : "purple",
        fontWeight: 100
    }

    return (
        <div className="Header">
            <Logo />
            <h1 style={myDynamicStyling}>Surfing paradise</h1>
        </div>
    );
}

export default Header;
