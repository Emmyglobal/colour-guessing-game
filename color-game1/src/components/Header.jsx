import React from "react";

function Header() {
    return (
        <div className="header">
            <h1 className="logo" style={{color:"white", textTransform:"uppercase"}}>Emmy</h1>
            <div className="nav">
                <ul>
                    <li><a href="about.html">About the Game</a></li>
                    <li><a href="help.html">Help</a></li>
                    <li><a href="reset.html">Reset Game</a></li>
                </ul>
            </div>
        </div>
    );
};
export default Header;