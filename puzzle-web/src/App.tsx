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

const level4 = [
  "3333333",
  "3000013",
  "3033303",
  "3533333",
  "3000003",
  "3433313",
  "3200003",
  "3333333"
]

const level5 = [
  "3333333",
  "3001003",
  "3004003",
  "3330333",
  "3330333",
  "3052403",
  "3100013",
  "3333333"
]

const levels = [level1, level2, level3, level4, level5];

export default App

function App() {
  const [level, setLevel] = useState(0);

  const handleWin = useCallback(() => {
    alert("You won!");
    setLevel(l => l + 1);
  }, []);

  return (
    <div>
      {levels[level] && <Level key={level} originMap={levels[level]} onWin={handleWin}/>}
      {!levels[level] && <h1>Congratulations</h1>}
    </div>
  )
}