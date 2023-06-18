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

  export default GameScreen