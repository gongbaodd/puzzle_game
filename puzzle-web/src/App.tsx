import { useCallback, useState } from 'react';
import './App.css'
import Level from './Components/Level'

const level1 = [
  "3333333",
  "3020303",
  "3030003",
  "3000003",
  "3000013",
  "3000003",
  "3000003",
  "3333333"
];

const level2 = [
  "3333333",
  "3020003",
  "3330003",
  "3100003",
  "3000003",
  "3000013",
  "3000003",
  "3333333"
]

const level3 = [
  "3333333",
  "3001303",
  "3033003",
  "3433303",
  "3000003",
  "3333033",
  "3333023",
  "3333333"
]

const levels = [level1, level2, level3];

export default App

function App() {
  const [level, setLevel] = useState(0);

  const handleWin = useCallback(() => {
    alert("You won!");
    setLevel(l => l + 1);
  }, []);

  return (
    <div>
      <Level key={level} originMap={levels[level]} onWin={handleWin}/>
    </div>
  )
}