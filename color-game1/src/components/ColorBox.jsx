import React, { useState } from "react";
import '../App.css';

function ColorBox({ color }) {

    let boxStyle = {
        height:"300px",
        width:"300px",
        backgroundColor: color,
        border: "white solid 2px",
        borderRadius: "5px"
    };
    return (
        <div className="container1">
            <h1 style={{marginTop: "100px"}}>Guess the correct Colour!</h1>
            <div  style={boxStyle} className="boxAnimation">

            </div>

        </div>
    );
};

export default ColorBox;