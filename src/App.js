import logo from './logo.svg'
import './App.css'
import { useState } from 'react';

function App() {
  const [currentByte, setCurrentByte] = useState(0)

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

  const handleClick = () => {
    setCurrentByte(255 - currentByte)
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
      <h1>{byteFromNumber(currentByte).toString()}</h1>
      <button onClick={handleClick}>hello</button>
    </div>
  );
}

export default App
