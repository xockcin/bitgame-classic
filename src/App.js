import logo from './logo.svg'
import './App.css'
import { useState } from 'react';

function App() {
  const [currentByte, setCurrentByte] = useState(0)

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
    </div>
  );
}

export default App
