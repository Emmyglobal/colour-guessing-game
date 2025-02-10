import React, { useState, useEffect} from "react";
import '../App.css';

function ColorOptions({ correctColor, onColorSelect }) {

// Generate Random Colour
    function generateColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        
        for (let i = 0; i < 6 ; i++)
        {
            const x = Math.floor(Math.random() * 16);
            color += letters[x];
        }
        return color;
    };

    // State to hold 6 random colors
    const [colors, setColors] = useState([]);

    // useEffect runs once when the component Loads
    useEffect(() => {
        const newColors = [...Array(5)].map(() => generateColor());
        newColors.push(correctColor);
        newColors.sort(() => Math.random() - 0.5);
        setColors(newColors);
        console.log("Generated colors:", newColors);
    }, [correctColor]);
     
    return (
        <div className="optionCont">
            {
                colors.map((color, index) => (
                    <button
                        key={index}
			data-testid={`color-option-${index}`}
                        style={{
                            width: "100px",
                            height: "50px",
                            backgroundColor: color,
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={() => onColorSelect(color)}
                    >
                    </button>
                ))
            }
           </div>
    );
};

export default ColorOptions;
