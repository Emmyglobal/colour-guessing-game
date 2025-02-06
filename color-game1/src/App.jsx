import React, { useState, useEffect} from "react";
import ColorBox from "./components/ColorBox";
import './App.css';
import Header from "./components/Header";
import ColorOptions from "./components/ColorOptions";

function App() {


  function generateColor() {
    const letters = "0123456789ABCDEF";
    let color ="#";

    for (let i = 0; i < 6; i++){
      let x = Math.floor(Math.random() * 16);
      color += letters[x];
    }
    return color;
  };
  const [correctColor, setCorrectColor] = useState(generateColor());
  const [colors, setColors] = useState([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [ctime, setCtime] = useState(60);
  const [gameOver, setGameOver] = useState(false); // Track game status (over or not)

  useEffect(() => {
    if (gameOver) return; // Don't run countdown if the game is over

    generateNewColors();
  }, [gameOver]);

  useEffect(() => {
    if (ctime <= 0) {
      setMessage("Time's up! ⏰ Game over!");
      setGameOver(true);
      // setTimeout(() => {
      //    generateNewColors();
      //    setScore(0);
      //   setCtime(60);
      //   setMessage("");
      //  }, 1000);
      return;
    }
    if (gameOver) return;
    const timer = setInterval(() => {
      setCtime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [ctime, gameOver]);

  const generateNewColors = () => {
    const newCorrectColor = generateColor();
    const newColors = [...Array(5)].map(() => generateColor()); // Generate 5 random colors
    const randomIndex = Math.floor(Math.random() * 6); // Pick a random index for the correct color
    newColors.splice(randomIndex, 0, newCorrectColor); // Insert the correct color into the options
    setCorrectColor(newCorrectColor);
    setColors(newColors);
  };

  useEffect(() => {
    generateNewColors();
  }, []);

  // Function to handle color selection
  function handleColorSelect(selectedColor) {
    if (gameOver) return;
    if (selectedColor === correctColor) {
      setMessage("✅ Correct! 🎉, generating new colors...");
      setScore(score + 1);
      setTimeout(() => {
        generateNewColors();
        setMessage("");
      }, 1000);
    } else{
      setMessage("Wrong! ❌ Try again...");
      setScore(score - 1);
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  };

  // generate a new color and reset options immediately
  function startNewGame() {
    generateNewColors();
    setGameOver(false);
    setMessage("");
    setScore(0);
    setCtime(0);
  };

const btn = {
alignSelf: "center", 
margin: "5px", 
padding:"7px", 
border:"none",
cursor:"pointer",
borderRadius:"5px"
  }
  return (
    <div className="container" style={{textAlign: "center", padding: "20px"}}>
      <Header />
      <hr />
      <p data-testid="gameInstructions" style={{ fontSize: "18px", fontWeight: "bold" }}>
        Guess the correct color! Click on the color that matches the displayed box.
      </p>
      <h4 data-testid="countdown">CountDown time: {ctime}</h4>
      <ColorBox color={correctColor}/>
      <p data-testid="message">{message}</p>
      <ColorOptions correctColor={correctColor} onColorSelect={handleColorSelect}/>
      <p data-testid="score">Your Score is: {score}</p>
      <button data-testid="newGameButton" style={btn} onClick={startNewGame}>New Game</button>
      <button data-testid="resetGameButton" style={btn} disabled={gameOver}>Reset Game</button>
    </div>
  );
}
export default App;
