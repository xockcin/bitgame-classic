import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [currentByte, setCurrentByte] = useState(0)
  const [originByte, setOriginByte] = useState(null)
  const [goalByte, setGoalByte] = useState(null)
  const [stepsList, setStepsList] = useState([])

  const newGame = () => {
    const origin = Math.floor(Math.random() * 256)
    const goal = Math.floor(Math.random() * 256)
    setOriginByte(origin)
    setGoalByte(goal)
    setCurrentByte(origin)
    setStepsList([])
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
    setStepsList(stepsList.concat(token))
  }

  const byteFromNumber = (number) => {
    const newByte = [];
    for (let i = 0; i < 8; i++) {
      newByte[i] = !!(number & (1 << i));
    }
    return newByte;
  }

  const GameScreen = ({origin, current, goal, steps, handleClick}) => (
    <div>
      <h1>start: {origin} *** goal: {goal}</h1>
      <h1>current: {current}</h1>
      <h1>steps: {steps.toString()}</h1>
      <h1>{byteFromNumber(current).reverse().toString()}</h1>
      {tokens.map(token => <button onClick={() => handleClick(token)}>{token}</button>)}
      <button onClick={newGame}>new game</button>
    </div>
  )

  const WinScreen = ({stepsList, newGame}) => (
    <div>
      <h1>You Won in {stepsList.length} steps!</h1>
      <button onClick={newGame}>play again</button>
    </div>
  )

  return (
    (currentByte === goalByte) ? 
      <WinScreen stepsList={stepsList} newGame={newGame} /> : 
      <GameScreen origin={originByte} current={currentByte} goal={goalByte} steps={stepsList} handleClick={handleClick}  />
  );
}

export default App
