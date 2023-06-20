import './App.css'
import { useState, useEffect } from 'react';
import { allSolutions } from './utilities/makeSolutions';

function App() {
  const [currentByte, setCurrentByte] = useState(0)
  const [originByte, setOriginByte] = useState(null)
  const [goalByte, setGoalByte] = useState(null)
  const [stepsList, setStepsList] = useState([])
  const [peek, setPeek] = useState(false)
  const [cheat, setCheat] = useState(null)

  const newGame = () => {
    const origin = Math.floor(Math.random() * 256)
    const goal = Math.floor(Math.random() * 256)
    setOriginByte(origin)
    setGoalByte(goal)
    setCurrentByte(origin)
    setStepsList([])
    setCheat(allSolutions[origin][goal].solution)
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

  const BitDiv = ({value}) => (
    <div style={{borderStyle: "solid", padding: "2px", margin: "2px"}}>
      <div style={value ? {background: "yellow"} : {background: 'black', color: "white"}}>
        <h3>{value ? "1" : "0"}</h3>
      </div>
    </div>
  )

  const GameByte = ({number}) => (
    <div style={{display: "flex"}}>
      {byteFromNumber(number).reverse().map(bit => <BitDiv value={bit} />)}
    </div>
  )

  const KeyPad = ({tokens}) => (
    <div>
      {tokens.map(token => <button onClick={() => handleClick(token)}>{token}</button>)}
    </div>
  )

  const GameScreen = ({origin, current, goal, steps, tokens, newGame}) => (
    <div>
      <h1>start: {origin} *** goal: {goal}</h1>
      <h1>current: {current}</h1>
      <h1>steps: {steps.toString()}</h1>
      <GameByte number={peek ? goal : current} />
      <KeyPad tokens={tokens} />
      <button onClick={newGame}>new game</button>
      <button onMouseDown={() => setPeek(true)} onMouseUp={() => setPeek(false)}>peek</button>
    </div>
  )

  const WinScreen = ({stepsList, newGame}) => (
    <div>
      <h1>You Won in {stepsList.length} steps!</h1>
      <h1>Best possible solution: {cheat.length} steps</h1>
      <button onClick={newGame}>play again</button>
    </div>
  )

  return (
    (currentByte === goalByte) ? 
      <WinScreen 
        stepsList={stepsList} 
        newGame={newGame} 
      /> : 
      <GameScreen 
        origin={originByte} 
        current={currentByte} 
        goal={goalByte} 
        steps={stepsList} 
        tokens={tokens} 
        newGame={newGame}  
      />
  );
}

export default App
