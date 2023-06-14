import logo from './logo.svg'
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [currentByte, setCurrentByte] = useState(0)
  const [originByte, setOriginByte] = useState(0)
  const [goalByte, setGoalByte] = useState(0)

  const newGame = () => {
    const origin = Math.floor(Math.random() * 256)
    const goal = Math.floor(Math.random() * 256)
    setOriginByte(origin)
    setGoalByte(goal)
    setCurrentByte(origin)
  }

  useEffect(() => {
    newGame()
  },[])

  const tokens = ["+", "<", "~", ">", "-"]

  const doToken = (number, token, size) => {
    switch (token) {
      case "+":
        return (number + 1) % size;
      case "<":
        return (number * 2) % size;
      case "~":
        return size - 1 - number;
      case ">":
        return Math.floor(number / 2);
      case "-":
        if (number === 0) {
          return 255
        }
        else {
          return number - 1
        }
      default:
        console.log("Invalid Token")
    }
  }

  const handleClick = (token) => {
    setCurrentByte(doToken(currentByte, token, 256))
  }

  const byteFromNumber = (number) => {
    const newByte = [];
    for (let i = 0; i < 8; i++) {
      newByte[i] = !!(number & (1 << i));
    }
    return newByte;
  }

  return (
    <div className="App">
      <h1>start: {originByte} *** goal: {goalByte}</h1>
      <h1>current: {currentByte}</h1>
      <h1>{byteFromNumber(currentByte).reverse().toString()}</h1>
      {tokens.map(token => <button onClick={() => handleClick(token)}>{token}</button>)}
      <button onClick={newGame}>new game</button>
    </div>
  );
}

export default App
